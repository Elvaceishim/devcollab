-- Drop existing trigger and function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Create or replace the function to handle new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
    -- Check if profile already exists
    if not exists (select 1 from public.profiles where id = new.id) then
        insert into public.profiles (id, email, name)
        values (
            new.id,
            new.email,
            coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
        );
    end if;
    return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Function to ensure all users have profiles
create or replace function public.ensure_all_users_have_profiles()
returns void as $$
declare
    user_record record;
begin
    for user_record in select id, email from auth.users
    loop
        if not exists (select 1 from public.profiles where id = user_record.id) then
            insert into public.profiles (id, email, name)
            values (
                user_record.id,
                user_record.email,
                split_part(user_record.email, '@', 1)
            );
        end if;
    end loop;
end;
$$ language plpgsql security definer;

-- Run the function to ensure all existing users have profiles
select public.ensure_all_users_have_profiles(); 