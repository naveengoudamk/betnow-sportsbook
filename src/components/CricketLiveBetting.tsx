'use client';

import { useState, useEffect } from 'react';
import styles from './CricketLiveBetting.module.css';

interface CricketMatch {
    id: number;
    team1: string;
    team2: string;
    tournament: string;
    status: 'live' | 'upcoming';
    currentInning?: string;
    score1?: string;
    score2?: string;
    overs1?: string;
    overs2?: string;
    currentOver?: string;
    lastBalls?: string[];
    matchType?: string;
    venue?: string;
    odds: {
        team1Win: number;
        team2Win: number;
        draw?: number;
    };
    inPlayOdds?: {
        nextBallSix: number;
        nextBallFour: number;
        nextBallWicket: number;
        nextBallDot: number;
    };
}

export default function CricketLiveBetting() {
    const [matches, setMatches] = useState<CricketMatch[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch live cricket matches from API
    const fetchLiveMatches = async () => {
        try {
            const response = await fetch('/api/cricket/live');
            const data = await response.json();

            if (data.success && data.data) {
                setMatches(data.data);
                setError(null);
            } else {
                setError('Failed to fetch live matches');
            }
        } catch (err) {
            console.error('Error fetching cricket data:', err);
            setError('Unable to load live matches');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchLiveMatches();
    }, []);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchLiveMatches();
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Simulate live odds fluctuation for better UX
    useEffect(() => {
        const interval = setInterval(() => {
            setMatches(prevMatches =>
                prevMatches.map(match => {
                    if (match.status === 'live') {
                        // Simulate slight odds fluctuation
                        return {
                            ...match,
                            odds: {
                                ...match.odds,
                                team1Win: +(match.odds.team1Win + (Math.random() - 0.5) * 0.05).toFixed(2),
                                team2Win: +(match.odds.team2Win + (Math.random() - 0.5) * 0.05).toFixed(2),
                            }
                        };
                    }
                    return match;
                })
            );
        }, 5000); // Update odds every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const getBallClass = (ball: string) => {
        if (ball === '6') return styles.six;
        if (ball === '4') return styles.four;
        if (ball === 'W') return styles.wicket;
        if (ball === '0') return styles.dot;
        return styles.runs;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h2 className={styles.title}>
                        <span className={styles.liveIcon}>🏏</span>
                        Cricket Live Betting
                    </h2>
                    <span className={styles.liveBadge}>
                        <span className={styles.livePulse}></span>
                        {matches.filter(m => m.status === 'live').length} LIVE NOW
                    </span>
                </div>
                <p className={styles.subtitle}>Real-time odds • In-play betting • Live updates</p>
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className={styles.loader}></div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>Loading live matches...</p>
                </div>
            )}

            {error && !loading && (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '12px'
                }}>
                    <p style={{ color: '#ff4444', fontSize: '1.1rem' }}>⚠️ {error}</p>
                    <button
                        onClick={fetchLiveMatches}
                        style={{
                            marginTop: '1rem',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(0, 255, 135, 0.1)',
                            border: '1px solid rgba(0, 255, 135, 0.3)',
                            borderRadius: '8px',
                            color: '#00ff87',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && matches.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px'
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                        🏏 No live cricket matches at the moment
                    </p>
                </div>
            )}

            <div className={styles.matchesGrid}>
                {matches.map(match => (
                    <div
                        key={match.id}
                        className={`${styles.matchCard} ${selectedMatch === match.id ? styles.selected : ''}`}
                        onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                    >
                        {/* Match Header */}
                        <div className={styles.matchHeader}>
                            <span className={styles.tournament}>{match.tournament}</span>
                            {match.status === 'live' && (
                                <span className={styles.liveIndicator}>
                                    <span className={styles.liveDot}></span>
                                    LIVE
                                </span>
                            )}
                        </div>

                        {/* Teams and Scores */}
                        <div className={styles.teamsSection}>
                            <div className={styles.teamRow}>
                                <div className={styles.teamInfo}>
                                    <span className={styles.flag}>🏴</span>
                                    <span className={styles.teamName}>{match.team1}</span>
                                </div>
                                <div className={styles.scoreInfo}>
                                    {match.score1 && (
                                        <>
                                            <span className={styles.score}>{match.score1}</span>
                                            {match.overs1 && <span className={styles.overs}>({match.overs1})</span>}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={styles.teamRow}>
                                <div className={styles.teamInfo}>
                                    <span className={styles.flag}>🏴</span>
                                    <span className={styles.teamName}>{match.team2}</span>
                                </div>
                                <div className={styles.scoreInfo}>
                                    {match.score2 && (
                                        <>
                                            <span className={styles.score}>{match.score2}</span>
                                            {match.overs2 && <span className={styles.overs}>({match.overs2})</span>}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Current Over */}
                        {match.status === 'live' && match.lastBalls && (
                            <div className={styles.currentOver}>
                                <span className={styles.overLabel}>This Over:</span>
                                <div className={styles.balls}>
                                    {match.lastBalls.map((ball, idx) => (
                                        <span key={idx} className={`${styles.ball} ${getBallClass(ball)}`}>
                                            {ball}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Match Winner Odds */}
                        <div className={styles.oddsSection}>
                            <div className={styles.oddsLabel}>Match Winner</div>
                            <div className={styles.oddsButtons}>
                                <button className={styles.oddButton}>
                                    <span className={styles.oddTeam}>{match.team1}</span>
                                    <span className={styles.oddValue}>{match.odds.team1Win.toFixed(2)}</span>
                                </button>
                                {match.odds.draw && (
                                    <button className={styles.oddButton}>
                                        <span className={styles.oddTeam}>Draw</span>
                                        <span className={styles.oddValue}>{match.odds.draw.toFixed(2)}</span>
                                    </button>
                                )}
                                <button className={styles.oddButton}>
                                    <span className={styles.oddTeam}>{match.team2}</span>
                                    <span className={styles.oddValue}>{match.odds.team2Win.toFixed(2)}</span>
                                </button>
                            </div>
                        </div>

                        {/* In-Play Betting Options */}
                        {selectedMatch === match.id && match.inPlayOdds && (
                            <div className={styles.inPlaySection}>
                                <div className={styles.inPlayHeader}>
                                    <span className={styles.inPlayTitle}>⚡ In-Play Betting</span>
                                    <span className={styles.inPlaySubtitle}>Next Ball Predictions</span>
                                </div>
                                <div className={styles.inPlayGrid}>
                                    <button className={styles.inPlayButton}>
                                        <span className={styles.inPlayLabel}>Six</span>
                                        <span className={styles.inPlayOdd}>{match.inPlayOdds.nextBallSix.toFixed(2)}</span>
                                    </button>
                                    <button className={styles.inPlayButton}>
                                        <span className={styles.inPlayLabel}>Four</span>
                                        <span className={styles.inPlayOdd}>{match.inPlayOdds.nextBallFour.toFixed(2)}</span>
                                    </button>
                                    <button className={styles.inPlayButton}>
                                        <span className={styles.inPlayLabel}>Wicket</span>
                                        <span className={styles.inPlayOdd}>{match.inPlayOdds.nextBallWicket.toFixed(2)}</span>
                                    </button>
                                    <button className={styles.inPlayButton}>
                                        <span className={styles.inPlayLabel}>Dot Ball</span>
                                        <span className={styles.inPlayOdd}>{match.inPlayOdds.nextBallDot.toFixed(2)}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* View More Button */}
                        <button className={styles.viewMoreBtn}>
                            {selectedMatch === match.id ? 'Show Less' : 'More Markets +'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
