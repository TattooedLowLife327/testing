// ✅ Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import banner from '../assets/llogbBanner.jpeg';
import '../index.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password,
      options: {
        shouldRemember: rememberMe
      }
    });

    if (error) {
      setErrorMsg(error.message);
    } else if (data.session) {
      const user = data.user;
      const hasSeenWelcome = user?.user_metadata?.hasSeenWelcome;

      if (!hasSeenWelcome) {
        navigate('/welcome');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-2 font-helvetica-light">
      <div className="w-full max-w-md rounded-2xl shadow-lg border border-purple-700 bg-[#111111]">
        <div className="w-full">
          <img
            src={banner}
            alt="LowLife Banner"
            className="w-full h-auto rounded-t-2xl"
          />
        </div>
        <div className="p-6">
          <h1 className="text-xl font-helvetica-bold text-center mb-4">Welcome Back, LowLife 🤘🏻</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-helvetica-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email Address"
                autoComplete="email"
                className="w-full p-2 rounded bg-black text-white border border-gray-700 font-helvetica-lightitalic"
              />
            </div>

            <div>
              <label className="block text-sm font-helvetica-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Your Password"
                  autoComplete="current-password"
                  className="w-full p-2 rounded bg-black text-white border border-gray-700 font-helvetica-lightitalic pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-2 right-2 text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              <div className="flex justify-between items-center mt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-700 bg-black focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link
                  to="/reset-password"
                  className="text-sm text-purple-400 hover:text-purple-300 font-helvetica-roman"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-900 p-2 rounded-xl font-helvetica-medium transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-6 font-helvetica-light">
            Not a LowLife yet?{' '}
            <Link
              to="/register"
              className="text-purple-400 underline font-helvetica-roman cursor-blackrocknroll"
            >
              Sign up here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
