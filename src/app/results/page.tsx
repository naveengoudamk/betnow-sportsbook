import Navbar from "@/components/Navbar";
import styles from "@/components/CricketLiveBetting.module.css";

async function getResults() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/cricket/matches`, { cache: 'no-store' });
    const data = await res.json();
    return data.results || [];
}

export default async function ResultsPage() {
    const results = await getResults();

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                    Match Results
                </h1>

                <div className={styles.matchesGrid}>
                    {results.length > 0 ? results.map((match: any) => (
                        <div key={match.id} className={styles.matchCard}>
                            <div className={styles.matchHeader}>
                                <span className={styles.tournament}>{match.series || 'Cricket Match'}</span>
                                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>COMPLETED</span>
                            </div>
                            <div className={styles.teamsSection}>
                                <div className={styles.teamRow}>
                                    <span className={styles.teamName}>{match.teams?.[0] || 'Team 1'}</span>
                                    <span className={styles.score}>{match.score?.[0]?.r}/{match.score?.[0]?.w}</span>
                                </div>
                                <div className={styles.teamRow}>
                                    <span className={styles.teamName}>{match.teams?.[1] || 'Team 2'}</span>
                                    <span className={styles.score}>{match.score?.[1]?.r}/{match.score?.[1]?.w}</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                                {match.status}
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', width: '100%', padding: '4rem' }}>
                            <p style={{ color: 'var(--color-text-dim)' }}>No recent results found.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
