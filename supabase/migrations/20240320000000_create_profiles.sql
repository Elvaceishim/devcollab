-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique,
    name text,
    bio text,
    location text,
    skills text[] default '{}',
    experience text default 'Junior',
    github text,
    linkedin text,
    portfolio text,
    availability text default 'Available',
    joined_at timestamp with time zone default timezone('utc'::text, now()),
    badges jsonb[] default '{}',
    endorsements jsonb[] default '{}',
    github_repos jsonb[] default '{}',
    quiz_results jsonb[] default '{}',
    preferences jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
    on public.profiles for select
    using ( true );

create policy "Users can insert their own profile."
    on public.profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update own profile."
    on public.profiles for update
    using ( auth.uid() = id );

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, name)
    values (new.id, new.email, new.raw_user_meta_data->>'name');
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger on_profile_updated
    before update on public.profiles
    for each row execute procedure public.handle_updated_at(); 