import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import banner from '../assets/llogbBanner.jpeg';
import ScrollInput from '../components/ui/ScrollInput';
import '../index.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
}

const validatePassword = (password: string): PasswordValidation => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /\d/.test(password),
  symbol: /[!$*@#&]/.test(password),
});

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [granboardName, setGranboardName] = useState('');
  const [highlightColor, setHighlightColor] = useState('#ffffff');
  const [gender, setGender] = useState('');
  const [passwordValid, setPasswordValid] = useState<PasswordValidation>(validatePassword(''));
  const [errorMsg, setErrorMsg] = useState('');

  const isPasswordStrong = Object.values(passwordValid).every(Boolean);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isPasswordStrong) {
      setErrorMsg('Password must meet strength requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          granboardName,
          highlightColor,
          gender,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/welcome');
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
          <h1 className="text-2xl font-helvetica-bold text-center mb-4">Create Your LowLife Account</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label>Full Name</label>
              <ScrollInput
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="As It Appears On Facebook"
                className="w-full p-2 rounded bg-black text-white border border-gray-700"
              />
              <p className="text-xs italic text-gray-400 mt-1">
                In the event of app failure, we will contact you via Messenger.
              </p>
            </div>

            <div>
              <label>Granboard Name</label>
              <ScrollInput
                type="text"
                placeholder="NOT Your GranID"
                value={granboardName}
                onChange={(e) => setGranboardName(e.target.value)}
                required
                className="w-full p-2 rounded bg-black text-white border border-gray-700"
              />
              <p className="text-xs italic text-gray-400 mt-1">
                Please insure you are using the exact capitalization and spacing. Once submitted, only admins can change it.
              </p>
            </div>

            <div>
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-2 rounded bg-black text-white border border-gray-700"
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              <p className="text-xs italic text-gray-400 mt-1">
                This is used to allow registration for gender-appropriate leagues/tournaments.
              </p>
            </div>

            <div>
              <label>Highlight Color</label>
              <ScrollInput
                type="color"
                value={highlightColor}
                onChange={(e) => setHighlightColor(e.target.value)}
                required
                className="w-full h-10 p-1 rounded bg-black border border-gray-700"
              />
              <p className="text-xs italic text-gray-400 mt-1">
                This color is used to personalize your app experience. You can change it in player settings.
              </p>
            </div>

            <div>
              <label>Email</label>
              <ScrollInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 rounded bg-black text-white border border-gray-700"
              />
              <p className="text-xs italic text-gray-400 mt-1 font-helvetica-lightitalic">
                We'll use this for password recovery and important updates.
              </p>
            </div>

            <div>
              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(validatePassword(e.target.value));
                  }}
                  required
                  placeholder="Enter Your Password"
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
            </div>

            <div>
              <label>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter Your Password"
                  className="w-full p-2 rounded bg-black text-white border border-gray-700 font-helvetica-lightitalic pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-2 right-2 text-white"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-red-500 text-xs mt-1 font-helvetica-lightitalic">
                  Passwords do not match.
                </p>
              )}
            </div>

            <div className="text-xs mt-1 font-helvetica-lightitalic space-y-1">
              <p className={passwordValid.length ? 'text-purple-400' : 'text-grey-400'}>
                {passwordValid.length ? '🤘🏼' : '❌'} At least 8 characters
              </p>
              <p className={passwordValid.uppercase ? 'text-purple-400' : 'text-grey-400'}>
                {passwordValid.uppercase ? '🤘🏼' : '❌'} Includes uppercase letter
              </p>
              <p className={passwordValid.number ? 'text-purple-400' : 'text-grey-400'}>
                {passwordValid.number ? '🤘🏼' : '❌'} Includes a number
              </p>
              <p className={passwordValid.symbol ? 'text-purple-400' : 'text-grey-400'}>
                {passwordValid.symbol ? '🤘🏼' : '❌'} Includes special character (! $ * @ # &)
              </p>
            </div>

            {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

            <button
              type="submit"
              disabled={!isPasswordStrong}
              className={`w-full p-2 rounded-xl font-helvetica-medium transition duration-300 ${
                isPasswordStrong
                  ? 'bg-purple-800 hover:bg-purple-900 cursor-pointer'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              Register
            </button>

            {/* 🔽 New Login Link */}
            <p className="text-center text-sm mt-6 font-helvetica-light">
              Already a LowLife?{' '}
              <Link
                to="/login"
                className="text-purple-400 underline font-helvetica-roman cursor-blackrocknroll"
              >
                Login!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
