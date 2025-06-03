// src/pages/AdminPanel.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;
      setUser(currentUser);

      const userRole = currentUser?.user_metadata?.role || '';
      setRole(userRole);

      if (!['Owner', 'Lead Admin', 'Admin', 'Mod'].includes(userRole)) {
        navigate('/dashboard');
      }
    };

    getSession();
  }, [navigate]);

  if (!user || !['Owner', 'Lead Admin', 'Admin', 'Mod'].includes(role)) return null;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 md:px-12 md:py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-500 mb-6">Admin Portal</h1>
      <div className="space-y-6">
        <div className="bg-zinc-900 p-4 md:p-6 rounded border border-purple-700">
          <h2 className="text-lg md:text-xl font-bold mb-2">Activity Log</h2>
          <p className="text-sm md:text-base text-gray-300">[View user actions, bans, profile changes]</p>
        </div>
        <div className="bg-zinc-900 p-4 md:p-6 rounded border border-purple-700">
          <h2 className="text-lg md:text-xl font-bold mb-2">Profile Approvals</h2>
          <p className="text-sm md:text-base text-gray-300">[Approve user profile edit requests]</p>
        </div>
        <div className="bg-zinc-900 p-4 md:p-6 rounded border border-purple-700">
          <h2 className="text-lg md:text-xl font-bold mb-2">Role Manager</h2>
          <p className="text-sm md:text-base text-gray-300">[Assign or remove Mod/Admin roles]</p>
        </div>
      </div>
    </div>
  );
}