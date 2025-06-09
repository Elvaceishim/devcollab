import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AuthTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      console.log('Attempting sign up with:', { email });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }

      console.log('Sign up response:', data);
      setMessage({
        type: 'success',
        text: 'Check your email for the confirmation link!',
      });
    } catch (error: any) {
      console.error('Sign up error details:', error);
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred during sign up',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setMessage(null);

    try {
      console.log('Attempting sign in with:', { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials or create an account first.');
        }
        throw error;
      }

      console.log('Sign in response:', data);
      setMessage({
        type: 'success',
        text: 'Successfully signed in!',
      });
    } catch (error: any) {
      console.error('Sign in error details:', error);
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred during sign in',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Test Authentication
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
              <button
                type="button"
                onClick={handleSignIn}
                disabled={loading}
                className="btn btn-secondary w-full"
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-md ${
                message.type === 'success'
                  ? 'bg-accent-50 text-accent-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 