import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleContinue = () => {
    navigate('/nda');
  };

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'HelveticaNeueLight',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      textAlign: 'left',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontFamily: 'HelveticaNeueBold', fontSize: '24px' }}>YO LOWLIFE!</h1>
      <p style={{ marginTop: '20px', fontSize: '16px', maxWidth: '600px' }}>
        You’ve been specially selected to help test the LowLife app during its early release phase.
        We’re counting on you to help shape it into the best possible space for every player.
        Everything you do here helps define what LowLife will become — and we don’t take that lightly.
      </p>
      <p style={{ marginTop: '20px', fontSize: '16px', maxWidth: '600px' }}>
        Before you can access the app, you’ll need to read and sign the LowLife NDA.
        This ensures everyone is on the same page and protects our shared space while it's still under development.
      </p>
      <button onClick={handleContinue} style={{
        marginTop: '30px',
        backgroundColor: '#fff',
        color: '#000',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontFamily: 'HelveticaNeueBold',
        cursor: 'pointer',
      }}>
        Continue
      </button>
    </div>
  );
}