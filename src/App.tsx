import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalLoader from './components/GlobalLoader';
import GlobalTransition from './components/GlobalTransition';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import NDA from './pages/NDA';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LeagueDetail from './pages/LeagueDetail';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <>
      <GlobalLoader />
      <GlobalTransition />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/nda" element={<NDA />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/league/:id" element={<LeagueDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/callback" element={<ResetPassword />} />

      </Routes>
    </>
  );
}

export default App;