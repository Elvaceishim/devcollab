-- Add avatar field to profiles table
alter table public.profiles
add column if not exists avatar text;

-- Update the handle_new_user function to include avatar
create or replace function public.handle_new_user()
returns trigger as $$
begin
    -- Check if profile already exists
    if not exists (select 1 from public.profiles where id = new.id) then
        insert into public.profiles (
            id,
            email,
            name,
            bio,
            location,
            skills,
            experience,
            github,
            linkedin,
            portfolio,
            availability,
            badges,
            endorsements,
            github_repos,
            quiz_results,
            preferences,
            avatar
        )
        values (
            new.id,
            new.email,
            coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
            '',
            '',
            '{}',
            'Junior',
            '',
            '',
            '',
            'Available',
            '{}',
            '{}',
            '{}',
            '{}',
            '{}',
            null
        );
    end if;
    return new;
end;
$$ language plpgsql security definer;

-- Update existing profiles to have null avatar
update public.profiles
set avatar = null
where avatar is null; 