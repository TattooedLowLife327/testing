import React from 'react';
import { useParams } from 'react-router-dom';
import { Trophy, Calendar, Users, Star } from 'lucide-react';

export default function LeagueDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">League #{id}</h1>
            <p className="text-purple-200 mt-2">Professional Competition Series</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold">Schedule</h3>
              <p className="text-gray-300 text-sm mt-1">March 1 - April 30, 2025</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <Users className="h-6 w-6 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold">Participants</h3>
              <p className="text-gray-300 text-sm mt-1">32 Players Registered</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold">Prize Pool</h3>
              <p className="text-gray-300 text-sm mt-1">$10,000</p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">League Details</h2>
            <div className="space-y-4 text-gray-300">
              <p>Join our premier competition featuring the best players worldwide.</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-purple-400 mr-2" />
                  Professional tournament structure
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-purple-400 mr-2" />
                  Live streaming of matches
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-purple-400 mr-2" />
                  Official ranking points
                </li>
              </ul>
            </div>

            <button className="mt-6 w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}