import Navbar from "@/components/Navbar";
import styles from "@/components/CricketLiveBetting.module.css";

async function getUpcomingMatches() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/cricket/matches`, { cache: 'no-store' });
    const data = await res.json();
    return data.upcoming || [];
}

export default async function UpcomingPage() {
    const matches = await getUpcomingMatches();

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                    Upcoming Cricket Matches
                </h1>

                <div className={styles.matchesGrid}>
                    {matches.length > 0 ? matches.map((match: any) => (
                        <div key={match.id} className={styles.matchCard}>
                            <div className={styles.matchHeader}>
                                <span className={styles.tournament}>{match.series || 'Cricket Match'}</span>
                                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{new Date(match.dateTimeGMT).toLocaleDateString()}</span>
                            </div>
                            <div className={styles.teamsSection}>
                                <div className={styles.teamRow}>
                                    <span className={styles.teamName}>{match.teams?.[0] || 'Team 1'}</span>
                                </div>
                                <div className={styles.teamRow}>
                                    <span className={styles.teamName}>{match.teams?.[1] || 'Team 2'}</span>
                                </div>
                            </div>
                            <div className={styles.oddsSection}>
                                <div className={styles.oddsLabel}>Opening Odds</div>
                                <div className={styles.oddsButtons}>
                                    <button className={styles.oddButton}>
                                        <span className={styles.oddValue}>1.90</span>
                                    </button>
                                    <button className={styles.oddButton}>
                                        <span className={styles.oddValue}>1.90</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', width: '100%', padding: '4rem' }}>
                            <p style={{ color: 'var(--color-text-dim)' }}>No upcoming matches scheduled currently.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
