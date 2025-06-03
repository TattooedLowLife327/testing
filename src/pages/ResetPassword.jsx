import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Supabase automatically logs in the user if token is valid
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError('Invalid or expired reset link.');
      }
    };
    checkSession();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password updated successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 font-helvetica-light">
      <form onSubmit={handleReset} className="w-full max-w-md p-6 rounded-2xl shadow-lg border border-purple-700 bg-[#111111] space-y-4">
        <h1 className="text-xl font-helvetica-bold text-center mb-2">Reset Your Password</h1>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full p-2 rounded bg-black text-white border border-gray-700"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-purple-800 hover:bg-purple-900 p-2 rounded-xl font-helvetica-medium transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
