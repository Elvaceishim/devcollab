// Profile.tsx
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'flowbite-react';
import { Edit3, Save, X, MapPin, FolderSync as Sync } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/common/Input';
import ImageUpload from '../components/common/ImageUpload';
import { useImageUpload } from '../hooks/useImageUpload';
import { supabase, deleteImage } from '@/lib/supabase';
import type { User } from '@supabase/auth-js';

export type UserWithQuizResults = User & {
  quizResults?: { score: number; date: string }[];
};

interface FormData {
  name: string;
  bio: string;
  location: string;
  skills: string;
  experience: 'Junior' | 'Mid-level' | 'Senior' | 'Lead';
  github: string;
  linkedin: string;
  portfolio: string;
  hourlyRate: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  avatars: string; // use avatars
}

const Profile: React.FC = () => {
  const { user, updateProfile, syncGitHubRepos } = useAuth();
  const { uploadAvatar: uploadToStorage } = useImageUpload();

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    location: '',
    skills: '',
    experience: 'Junior',
    github: '',
    linkedin: '',
    portfolio: '',
    hourlyRate: '',
    availability: 'Available',
    avatars: '' // use avatars
  });

  // Load profile
  useEffect(() => {
    async function load() {
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profile) {
        setFormData({
          name: profile.name,
          bio: profile.bio,
          location: profile.location,
          skills: (profile.skills || []).join(', '),
          experience: profile.experience,
          github: profile.github || '',
          linkedin: profile.linkedin || '',
          portfolio: profile.portfolio || '',
          hourlyRate: (profile.hourly_rate || 0).toString(),
          availability: profile.availability,
          avatars: profile.avatars || profile.avatar_url || '' // use avatars
        });
      }
    }
    load();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const payload = {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        skills: formData.skills
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
        experience: formData.experience,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        hourly_rate: parseFloat(formData.hourlyRate) || 0,
        availability: formData.availability,
        avatars: formData.avatars // use avatars
      };
      await updateProfile(payload);
      setIsEditing(false);
    } catch (e: any) {
      setError(e.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (file: File | null) => {
    if (!file || !user) return;
    setIsUploading(true);
    setError(null);
    try {
      const publicUrl = await uploadToStorage(file);
      if (!publicUrl) throw new Error('Failed to upload avatar');

      // Delete old avatar if exists
      if (formData.avatars) {
        const oldKey = formData.avatars.split('/').pop();
        if (oldKey) {
          await deleteImage(oldKey, 'avatars');
        }
      }

      await updateProfile({ avatars: publicUrl });

      setFormData(f => ({ ...f, avatars: publicUrl }));
    } catch (e: any) {
      setError(e.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  // Adapter for ImageUpload's onImageUpload prop
  const handleImageUpload = async (file: File) => {
    await handleAvatarChange(file);
    // After upload, return the new public URL
    return formData.avatars || null;
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex space-x-2">
          {formData.github && (
            <Button
              outline
              onClick={async () => {
                setSyncing(true);
                await syncGitHubRepos?.();
                setSyncing(false);
              }}
              disabled={syncing}
              size="sm"
            >
              <Sync className="mr-1" />
              {syncing ? 'Syncing...' : 'Sync GitHub'}
            </Button>
          )}
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-1" />
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="mr-1" /> Save
              </Button>
              <Button color="light" onClick={() => setIsEditing(false)}>
                <X className="mr-1" /> Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700">{error}</div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <Card className="p-4 text-center">
          <ImageUpload
            currentImage={formData.avatars}
            onImageChange={handleAvatarChange}
            onImageUpload={handleImageUpload} // Use the adapter function
            loading={isUploading}
            label="Avatar"
            accept="image/*"
          />
          {isEditing ? (
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          ) : (
            <h2 className="text-xl font-semibold mt-2">
              {formData.name}
            </h2>
          )}
          <span className="inline-block mt-1 px-2 py-1 bg-green-100 rounded">
            {formData.availability}
          </span>
          <div className="mt-2 flex justify-center text-gray-600">
            <MapPin className="mr-1" />
            {formData.location}
          </div>
        </Card>

        {/* Right */}
        <div className="space-y-6 lg:col-span-2">
          {/* About */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded p-2"
              />
            ) : (
              <p>{formData.bio}</p>
            )}
          </Card>

          {/* Professional */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Experience</label>
                {isEditing ? (
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  >
                    {['Junior', 'Mid-level', 'Senior', 'Lead'].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.experience}</p>
                )}
              </div>

              <div>
                <label>Availability</label>
                {isEditing ? (
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  >
                    {['Available', 'Busy', 'Not Available'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.availability}</p>
                )}
              </div>

              <div>
                <label>Location</label>
                {isEditing ? (
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                ) : (
                  <p>{formData.location}</p>
                )}
              </div>

              <div>
                <label>Hourly Rate</label>
                {isEditing ? (
                  <Input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                ) : (
                  <p>${formData.hourlyRate}/hr</p>
                )}
              </div>

              {isEditing && (
                <div className="md:col-span-2">
                  <label>Skills</label>
                  <Input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Comma separated"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Links */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>GitHub Username</label>
                {isEditing ? (
                  <Input
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="GitHub username"
                  />
                ) : (
                  <p>{formData.github}</p>
                )}
              </div>

              <div>
                <label>LinkedIn Username</label>
                {isEditing ? (
                  <Input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn username"
                  />
                ) : (
                  <p>{formData.linkedin}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label>Portfolio URL</label>
                {isEditing ? (
                  <Input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                ) : (
                  <p>{formData.portfolio}</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Button>Save</Button>
      <Card>
        {/* content */}
      </Card>
    </div>
  );
};

export default Profile;
