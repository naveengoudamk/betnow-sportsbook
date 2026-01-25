import Navbar from "@/components/Navbar";
import CricketLiveBetting from "@/components/CricketLiveBetting";
import { getBettingTips } from "@/utils/cricketUtils";

export default function Home() {
  const tips = getBettingTips();

  return (
    <main>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            🏏 Cricket Live Betting
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Experience real-time cricket betting with live scores, dynamic odds, and in-play markets
          </p>
        </div>

        {/* Cricket Live Betting Section */}
        <CricketLiveBetting />

        {/* Betting Tips Section */}
        <div style={{
          marginTop: '4rem',
          marginBottom: '4rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span> Expert Betting Tips
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {tips.map((tip, index) => (
              <div key={index} style={{
                padding: '1.25rem',
                background: 'rgba(0, 255, 135, 0.05)',
                borderLeft: '4px solid #00ff87',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
