import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MatchCard from "@/components/MatchCard";

// Mock data
const featuredMatches = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    league: "Premier League",
    time: "20:00",
    isLive: true,
    odds: { home: 2.10, draw: 3.50, away: 3.20 }
  },
  {
    id: 2,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    time: "Tomorrow, 19:45",
    isLive: false,
    odds: { home: 2.45, draw: 3.60, away: 2.80 }
  },
  {
    id: 3,
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    league: "NBA",
    time: "02:00",
    isLive: false,
    odds: { home: 1.90, draw: 12.00, away: 1.90 }
  },
  {
    id: 4,
    homeTeam: "Djokovic",
    awayTeam: "Alcaraz",
    league: "Wimbledon Final",
    time: "Sunday, 14:00",
    isLive: false,
    odds: { home: 1.75, draw: 0.00, away: 2.10 } // Tennis doesn't have draw usually in betting similar to football, but for demo sake
  },
  {
    id: 5,
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    league: "Bundesliga",
    time: "Today, 18:30",
    isLive: false,
    odds: { home: 1.55, draw: 4.20, away: 5.50 }
  },
  {
    id: 6,
    homeTeam: "Chiefs",
    awayTeam: "49ers",
    league: "NFL",
    time: "Sunday, 18:30",
    isLive: false,
    odds: { home: 1.80, draw: 14.00, away: 2.05 }
  }
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <Hero />

        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Trending Matches</h2>
            <button className="btn-outline" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>View All</button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredMatches.map(match => (
              <MatchCard
                key={match.id}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                league={match.league}
                time={match.time}
                isLive={match.isLive}
                odds={match.odds}
              />
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Popular Sports</h2>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {['Football', 'Basketball', 'Tennis', 'Cricket', 'Esports', 'Ice Hockey', 'MMA'].map((sport) => (
              <div key={sport} className="glass-panel" style={{
                padding: '1.5rem 2.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.05)',
                minWidth: '150px',
                textAlign: 'center',
                transition: 'background 0.2s'
              }}>
                {sport}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
