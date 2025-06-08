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
   - Create a storage bucket named `avatars` for profile images
   - Set up the following storage policies for the `avatars` bucket:

   **SELECT policy (for viewing images):**
   ```sql
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
   ```

   **INSERT policy (for uploading images):**
   ```sql
   CREATE POLICY "Authenticated users can upload avatars" ON storage.objects 
   FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
   ```

   **UPDATE policy (for updating images):**
   ```sql
   CREATE POLICY "Users can update own avatars" ON storage.objects 
   FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
   ```

   **DELETE policy (for deleting images):**
   ```sql
   CREATE POLICY "Users can delete own avatars" ON storage.objects 
   FOR DELETE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Image Upload Setup

The application includes a comprehensive image upload system with the following features:

- **Avatar Upload**: Users can upload profile pictures
- **Image Validation**: File type and size validation
- **Automatic Compression**: Optimized for web delivery
- **Secure Storage**: Images stored in Supabase Storage
- **Preview System**: Real-time image preview
- **Error Handling**: Comprehensive error messages

#### Storage Configuration

Make sure your Supabase storage bucket is configured with the correct policies:

1. Go to Storage in your Supabase dashboard
2. Create a bucket named `avatars`
3. Set it to public
4. Apply the RLS policies mentioned above

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
│   ├── common/         # Generic components (Button, Input, etc.)
│   ├── auth/           # Authentication components
│   ├── projects/       # Project-related components
│   ├── github/         # GitHub integration
│   └── ...
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
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