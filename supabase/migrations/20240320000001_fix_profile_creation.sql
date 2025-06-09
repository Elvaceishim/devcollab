-- Function to create profile for existing users
create or replace function public.create_profile_for_existing_user(user_id uuid)
returns void as $$
begin
    -- Check if profile already exists
    if not exists (select 1 from public.profiles where id = user_id) then
        -- Get user email from auth.users
        declare
            user_email text;
        begin
            select email into user_email from auth.users where id = user_id;
            
            -- Create profile
            insert into public.profiles (id, email)
            values (user_id, user_email);
        end;
    end if;
end;
$$ language plpgsql security definer;

-- Update the handle_new_user function to be more robust
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