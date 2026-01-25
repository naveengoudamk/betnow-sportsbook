import Navbar from "@/components/Navbar";
import CricketLiveBetting from "@/components/CricketLiveBetting";

export default function Home() {
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
      </div>
    </main>
  );
}
