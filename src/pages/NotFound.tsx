import { Link } from 'react-router-dom';
import banner from '../assets/llogbBanner.jpeg';
import '../index.css';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 font-helvetica-light">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg border border-purple-700 bg-[#111111]">
        {/* Banner */}
        <div className="w-full mb-6">
          <img
            src={banner}
            alt="LowLife Banner"
            className="w-full h-auto max-h-32 object-contain rounded-xl"
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-helvetica-bold mb-2">404</h1>
          <p className="text-xl font-helvetica-medium mb-2">Well, that's not very LowLife of you 🤘🏻</p>
          <p className="text-sm font-helvetica-light mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-purple-800 hover:bg-purple-900 px-6 py-2 rounded-xl text-white font-helvetica-medium transition cursor-blackrocknroll"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}