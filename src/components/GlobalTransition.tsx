import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function GlobalTransition() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 2000); // Reduced to 2 seconds
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <img
        src="/horns.gif"
        alt="Page Transition"
        className="w-32 h-32 object-contain animate-fade-in-out"
      />
    </div>
  );
}