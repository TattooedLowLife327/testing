import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import registrationBanner from '../assets/registrationBanner.jpg';

export default function LeagueList() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const { data, error } = await supabase
        .from('leagues')
        .select('*')
        .order('start_date', { ascending: true });

      if (!error) {
        setLeagues(data);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <img
        src={registrationBanner}
        alt="GranBoard League Banner"
        className="w-full object-cover mb-4"
        style={{ maxHeight: '200px' }}
      />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Available Leagues</h1>
        {leagues.length === 0 ? (
          <p>No leagues available at this time.</p>
        ) : (
          <ul className="space-y-4">
            {leagues.map((league) => (
              <li key={league.id} className="border p-4 rounded bg-gray-900">
                <h2 className="text-xl font-semibold">{league.name}</h2>
                <p className="text-sm text-gray-400">
                  {league.start_date} to {league.end_date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
