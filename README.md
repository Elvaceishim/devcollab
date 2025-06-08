# DevCollab Platform

A comprehensive developer collaboration platform built with React, TypeScript, and Supabase.

## Features

- **Project Management**: Create and manage development projects
- **Team Formation**: Find and connect with developers
- **Advanced Search**: Filter projects by skills, type, and more
- **GitHub Integration**: Sync repositories and showcase work
- **Profile System**: Complete developer profiles with image upload
- **Real-time Chat**: Team communication
- **Task Management**: Kanban boards for project organization
- **Trending Projects**: Discover popular projects
- **Matchmaking Quiz**: Get personalized project recommendations

## Setup

### Prerequisites

- Node.js 18+ 
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy your project URL and anon key

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

6. **IMPORTANT: Set up Supabase Storage**

   Go to your Supabase dashboard and follow these steps:

   **Step 1: Create Storage Bucket**
   - Navigate to Storage in your Supabase dashboard
   - Click "New bucket"
   - Name it `avatars`
   - Set it to **Public**
   - Click "Create bucket"

   **Step 2: Set up Storage Policies**
   
   Go to Storage > Policies and create the following policies for the `avatars` bucket:

   **Policy 1: Public Read Access**
   ```sql
   CREATE POLICY "Public Access" ON storage.objects 
   FOR SELECT USING (bucket_id = 'avatars');
   ```

   **Policy 2: Authenticated Upload**
   ```sql
   CREATE POLICY "Authenticated users can upload avatars" ON storage.objects 
   FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
   ```

   **Policy 3: Authenticated Update**
   ```sql
   CREATE POLICY "Users can update own avatars" ON storage.objects 
   FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
   ```

   **Policy 4: Authenticated Delete**
   ```sql
   CREATE POLICY "Users can delete own avatars" ON storage.objects 
   FOR DELETE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
   ```

   **Alternative: Use the Supabase Dashboard**
   - Go to Storage > Policies
   - Click "New Policy" for each policy above
   - Use the policy editor to create them

7. Start the development server:
   ```bash
   npm run dev
   ```

### Image Upload Setup

The application includes a comprehensive image upload system with the following features:

- **Avatar Upload**: Users can upload profile pictures
- **Image Validation**: File type and size validation (5MB max)
- **Automatic Compression**: Optimized for web delivery
- **Secure Storage**: Images stored in Supabase Storage
- **Preview System**: Real-time image preview
- **Error Handling**: Comprehensive error messages
- **Auto-cleanup**: Old images are automatically deleted when new ones are uploaded

#### Storage Configuration Verification

To verify your storage is set up correctly:

1. **Check Bucket Exists**: Go to Storage in Supabase dashboard, ensure `avatars` bucket exists and is public
2. **Verify Policies**: Go to Storage > Policies, ensure all 4 policies are created
3. **Test Upload**: Try uploading an avatar in the app profile section

#### Troubleshooting

**Common Issues:**

1. **"Bucket not found" error**: Make sure the `avatars` bucket exists and is public
2. **"Permission denied" error**: Check that all RLS policies are correctly set up
3. **"File too large" error**: Ensure file is under 5MB
4. **"Invalid file type" error**: Only image files (PNG, JPG, GIF, WebP) are allowed

**Debug Steps:**
1. Check browser console for detailed error messages
2. Verify environment variables are set correctly
3. Test Supabase connection in browser network tab
4. Check Supabase logs in dashboard

#### Usage

The `ImageUpload` component can be used throughout the application:

```tsx
import ImageUpload from './components/common/ImageUpload';
import { useImageUpload } from './hooks/useImageUpload';

const { uploadAvatar } = useImageUpload();

<ImageUpload
  currentImage={user.avatar}
  onImageChange={handleImageChange}
  onImageUpload={uploadAvatar}
  size="lg"
  shape="circle"
  label="Upload Avatar"
/>
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Storage, Auth)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, ImageUpload, etc.)
│   ├── auth/           # Authentication components
│   ├── projects/       # Project-related components
│   ├── github/         # GitHub integration
│   ├── networking/     # Developer networking features
│   └── ...
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks (useImageUpload, etc.)
├── lib/                # Utility libraries (Supabase client)
├── pages/              # Main application pages
├── types/              # TypeScript type definitions
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details