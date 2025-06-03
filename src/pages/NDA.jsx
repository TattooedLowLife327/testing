import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function NDA() {
  const [signature, setSignature] = useState('');
  const [ip, setIp] = useState('');
  const [consent, setConsent] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [startTime] = useState(Date.now());
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp('unknown'));
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      setScrolledToBottom(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signature || !consent || !scrolledToBottom) return;

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;

    const fileName = `NDA_${user.id}_${Date.now()}.pdf`;
    const ndaText = `SIGNED NDA\n\nName: ${signature}\nIP: ${ip}\nDate: ${new Date().toLocaleString()}\nTime on Page: ${duration}s`;

    const blob = new Blob([ndaText], { type: 'application/pdf' });
    await supabase.storage.from('signed-documents').upload(fileName, blob);
    await supabase.from('nda_signatures').insert([{ user_id: user.id, file_name: fileName, ip, duration }]);
    navigate('/dashboard');
  };

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      padding: '30px',
      fontFamily: 'HelveticaNeueLight'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#111111',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid purple'
      }}>
        <h1 style={{ textAlign: 'center', fontFamily: 'HelveticaNeueBold', fontSize: '20px' }}>LowLife NDA Agreement</h1>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            overflowY: 'scroll',
            height: '300px',
            padding: '10px',
            marginTop: '20px',
            border: '1px solid gray',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}
        >
          <p>[ FINAL NDA TEXT GOES HERE — insert exact agreement later ]</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Typed Signature</label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid gray',
              backgroundColor: 'black',
              color: 'white',
              marginBottom: '15px'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={() => setConsent(!consent)}
              required
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontSize: '13px' }}>I consent to electronically signing this document</span>
          </div>
          <p style={{ fontSize: '12px', color: '#ccc' }}>
            Your IP: {ip} | Time: {new Date().toLocaleString()}
          </p>
          <button
            type="submit"
            disabled={!signature || !consent || !scrolledToBottom}
            style={{
              marginTop: '20px',
              backgroundColor: 'purple',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'HelveticaNeueBold',
              cursor: 'pointer',
              opacity: (!signature || !consent || !scrolledToBottom) ? 0.5 : 1
            }}
          >
            I Agree and Continue
          </button>
        </form>
      </div>
    </div>
  );
}