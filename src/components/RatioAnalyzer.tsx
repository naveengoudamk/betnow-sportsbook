'use client';

import { useState, useEffect } from 'react';
import styles from './RatioAnalyzer.module.css';

interface MatchRatio {
    id: number;
    team1: string;
    team2: string;
    score1?: string;
    score2?: string;
    overs1?: string;
    overs2?: string;
    status: string;
    matchType: string;
    ratios: {
        team1: { back: number; lay: number };
        team2: { back: number; lay: number };
    };
    sessions: { name: string; back: number; lay: number }[];
    lastBalls?: string[];
}

export default function RatioAnalyzer() {
    const [matches, setMatches] = useState<MatchRatio[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/cricket/live');
            const data = await res.json();
            if (data.success) {
                setMatches(data.data);
                if (!selectedId && data.data.length > 0) {
                    setSelectedId(data.data[0].id);
                }
            }
        } catch (error) {
            console.error('Ratio analysis error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const selectedMatch = matches.find(m => m.id === selectedId) || matches[0];

    if (loading && matches.length === 0) {
        return <div className={styles.loading}>Analyzing Market Ratios...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.matchSelector}>
                {matches.map(m => (
                    <button
                        key={m.id}
                        className={`${styles.selectBtn} ${selectedId === m.id ? styles.active : ''}`}
                        onClick={() => setSelectedId(m.id)}
                    >
                        {m.team1} vs {m.team2}
                    </button>
                ))}
            </div>

            {selectedMatch && (
                <div className={styles.mainContainer}>
                    {/* Live Score Header */}
                    <div className={styles.scoreCard}>
                        <div className={styles.matchMeta}>
                            <span className={styles.liveBadge}>LIVE LINE</span>
                            <span className={styles.matchType}>{selectedMatch.matchType}</span>
                        </div>

                        <div className={styles.liveScoreRow}>
                            <div className={styles.teamScore}>
                                <div className={styles.teamName}>{selectedMatch.team1}</div>
                                <div className={styles.scoreValue}>{selectedMatch.score1} <span className={styles.overs}>({selectedMatch.overs1})</span></div>
                            </div>
                            <div className={styles.vs}>VS</div>
                            <div className={styles.teamScore}>
                                <div className={styles.teamName}>{selectedMatch.team2}</div>
                                <div className={styles.scoreValue}>{selectedMatch.score2} <span className={styles.overs}>({selectedMatch.overs2})</span></div>
                            </div>
                        </div>

                        <div className={styles.recentBalls}>
                            {selectedMatch.lastBalls?.map((b, i) => (
                                <span key={i} className={`${styles.ball} ${styles[`ball_${b}`] || styles.ball_runs}`}>
                                    {b}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Ratio & Market Section */}
                    <div className={styles.gridContainer}>
                        {/* Match Odds (Ratio) */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Match Ratio (Odds)</h3>
                            <div className={styles.ratioTable}>
                                <div className={styles.tableHead}>
                                    <span>Team</span>
                                    <span style={{ color: '#007bff' }}>Back</span>
                                    <span style={{ color: '#e83e8c' }}>Lay</span>
                                </div>
                                <div className={styles.tableRow}>
                                    <span className={styles.teamCol}>{selectedMatch.team1}</span>
                                    <button className={styles.backBtn}>{selectedMatch.ratios.team1.back}</button>
                                    <button className={styles.layBtn}>{selectedMatch.ratios.team1.lay}</button>
                                </div>
                                <div className={styles.tableRow}>
                                    <span className={styles.teamCol}>{selectedMatch.team2}</span>
                                    <button className={styles.backBtn}>{selectedMatch.ratios.team2.back}</button>
                                    <button className={styles.layBtn}>{selectedMatch.ratios.team2.lay}</button>
                                </div>
                            </div>
                        </div>

                        {/* Session Section */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Session / Fancy</h3>
                            <div className={styles.sessionGrid}>
                                {selectedMatch.sessions.map((s, i) => (
                                    <div key={i} className={styles.sessionCard}>
                                        <div className={styles.sessionName}>{s.name}</div>
                                        <div className={styles.sessionOdds}>
                                            <button className={styles.layBtn}>{s.back}</button>
                                            <button className={styles.backBtn}>{s.lay}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Win Prediction Meter */}
                    <div className={styles.predictionSection}>
                        <h3 className={styles.sectionTitle}>Win Analysis</h3>
                        <div className={styles.meterContainer}>
                            <div className={styles.meterLabel}>{selectedMatch.team1} {selectedMatch.ratios.team1.back}%</div>
                            <div className={styles.meter}>
                                <div
                                    className={styles.meterFill}
                                    style={{ width: `${selectedMatch.ratios.team1.back}%` }}
                                ></div>
                            </div>
                            <div className={styles.meterLabel}>{selectedMatch.team2} {selectedMatch.ratios.team2.lay}%</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
