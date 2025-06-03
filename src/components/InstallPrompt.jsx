// src/components/InstallPrompt.jsx
import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

    if (isIOSDevice && isSafari) {
      setIsIOS(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt && !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-purple-900 text-white p-4 rounded-xl shadow-xl z-50 text-center">
      {isIOS ? (
        <>
          <p className="mb-2 font-helvetica-medium">
            Add LowLife to your home screen:
          </p>
          <p className="text-sm font-helvetica-lightitalic">
            Tap <span className="text-xl">⬆️</span> then “Add to Home Screen”
          </p>
        </>
      ) : (
        <>
          <p className="mb-2 font-helvetica-medium">Install the LowLife App?</p>
          <button
            onClick={handleInstallClick}
            className="mt-2 bg-white text-black font-helvetica-medium px-4 py-2 rounded"
          >
            Install
          </button>
        </>
      )}
    </div>
  );
}
