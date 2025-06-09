-- Update the handle_new_user function with proper defaults
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
            preferences
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
            '{}'
        );
    end if;
    return new;
end;
$$ language plpgsql security definer;

-- Update the ensure_all_users_have_profiles function with proper defaults
create or replace function public.ensure_all_users_have_profiles()
returns void as $$
declare
    user_record record;
begin
    for user_record in select id, email from auth.users
    loop
        if not exists (select 1 from public.profiles where id = user_record.id) then
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
                preferences
            )
            values (
                user_record.id,
                user_record.email,
                split_part(user_record.email, '@', 1),
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
                '{}'
            );
        end if;
    end loop;
end;
$$ language plpgsql security definer;

-- Run the function to update all existing profiles with proper defaults
update public.profiles
set
    bio = coalesce(bio, ''),
    location = coalesce(location, ''),
    skills = coalesce(skills, '{}'),
    experience = coalesce(experience, 'Junior'),
    github = coalesce(github, ''),
    linkedin = coalesce(linkedin, ''),
    portfolio = coalesce(portfolio, ''),
    availability = coalesce(availability, 'Available'),
    badges = coalesce(badges, '{}'),
    endorsements = coalesce(endorsements, '{}'),
    github_repos = coalesce(github_repos, '{}'),
    quiz_results = coalesce(quiz_results, '{}'),
    preferences = coalesce(preferences, '{}')
where
    bio is null
    or location is null
    or skills is null
    or experience is null
    or github is null
    or linkedin is null
    or portfolio is null
    or availability is null
    or badges is null
    or endorsements is null
    or github_repos is null
    or quiz_results is null
    or preferences is null; 