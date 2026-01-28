import Navbar from "@/components/Navbar";

const TOURNAMENTS = [
    { name: "Indian Premier League 2026", duration: "Mar - May 2026", status: "Upcoming", image: "🏏" },
    { name: "ICC T20 World Cup", duration: "Oct - Nov 2026", status: "Upcoming", image: "🏆" },
    { name: "The Ashes", duration: "Jan - Feb 2026", status: "Live", image: "🔥" },
    { name: "Pakistan Super League", duration: "Feb - Mar 2026", status: "Upcoming", image: "🌟" },
    { name: "Big Bash League", duration: "Dec - Jan 2026", status: "Live", image: "⚡" },
];

export default function TournamentsPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                    Major Tournaments
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                    {TOURNAMENTS.map((t, i) => (
                        <div key={i} style={{
                            background: 'var(--color-surface)',
                            borderRadius: '20px',
                            padding: '2rem',
                            border: '1px solid var(--color-border)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.image}</div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t.name}</h3>
                            <p style={{ color: 'var(--color-text-dim)', marginBottom: '1rem' }}>{t.duration}</p>
                            <span style={{
                                padding: '0.4rem 1rem',
                                background: t.status === 'Live' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                color: t.status === 'Live' ? 'var(--color-primary)' : 'var(--color-text-dim)',
                                borderRadius: '10px',
                                fontSize: '0.8rem',
                                fontWeight: 700
                            }}>
                                {t.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
