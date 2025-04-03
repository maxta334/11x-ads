-- Reset everything
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    has_access BOOLEAN DEFAULT false NOT NULL,
    customer_id TEXT
);

-- Create unique index on email (needed for webhook lookup)
CREATE UNIQUE INDEX idx_profiles_email ON public.profiles (email);
CREATE UNIQUE INDEX idx_profiles_id ON public.profiles (id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, has_access)
    VALUES (new.id, new.email, false);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Allow admin to manage all profiles
-- Replace ADMIN_USER_ID with your actual user ID
CREATE POLICY "Admin can manage all profiles"
    ON public.profiles FOR ALL
    TO authenticated
    USING (auth.uid()::text = current_setting('app.admin_user_id', true))
    WITH CHECK (true);

-- Allow webhook service to update profiles
CREATE POLICY "Service role can update profiles"
    ON public.profiles FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow webhook service to read all profiles (needed for email lookup)
CREATE POLICY "Service role can read all profiles"
    ON public.profiles FOR SELECT
    TO service_role
    USING (true);

-- Allow webhook service to insert profiles
CREATE POLICY "Service role can insert profiles"
    ON public.profiles FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;

-- Grant access to authenticated users
GRANT ALL ON public.profiles TO authenticated;

-- Insert existing users if any
INSERT INTO public.profiles (id, email, has_access)
SELECT id, email, false
FROM auth.users
ON CONFLICT (id) DO NOTHING;