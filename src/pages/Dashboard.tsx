import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './pages/DashboardHome';
import Tournaments from './pages/Tournaments';
import Leagues from './pages/Leagues';
import FriendsList from './pages/FriendsList';
import ProfileTabs from './pages/ProfileTabs';
import BottomTabBar from './components/BottomTabBar';

export default function DashboardLayout() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/friends" element={<FriendsList />} />
            <Route path="/profile" element={<ProfileTabs />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        <BottomTabBar />
      </div>
    </Router>
  );
}
