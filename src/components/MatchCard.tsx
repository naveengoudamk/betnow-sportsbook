import styles from './MatchCard.module.css';

interface MatchProps {
    homeTeam: string;
    awayTeam: string;
    league: string;
    time: string;
    isLive?: boolean;
    odds: {
        home: number;
        draw: number;
        away: number;
    };
}

export default function MatchCard({ homeTeam, awayTeam, league, time, isLive, odds }: MatchProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span>{league}</span>
                {isLive ? (
                    <span className={styles.liveIndicator}>
                        <span className={styles.liveDot} /> LIVE
                    </span>
                ) : (
                    <span>{time}</span>
                )}
            </div>

            <div className={styles.teams}>
                <div className={styles.team}>
                    {/* In a real app, logos would go here */}
                    <span className={styles.teamName}>{homeTeam}</span>
                </div>
                <span className={styles.vs}>VS</span>
                <div className={styles.team}>
                    <span className={styles.teamName}>{awayTeam}</span>
                </div>
            </div>

            <div className={styles.odds}>
                <button className={styles.oddBtn}>
                    <span className={styles.oddLabel}>1</span>
                    <span className={styles.oddValue}>{odds.home.toFixed(2)}</span>
                </button>
                <button className={styles.oddBtn}>
                    <span className={styles.oddLabel}>X</span>
                    <span className={styles.oddValue}>{odds.draw.toFixed(2)}</span>
                </button>
                <button className={styles.oddBtn}>
                    <span className={styles.oddLabel}>2</span>
                    <span className={styles.oddValue}>{odds.away.toFixed(2)}</span>
                </button>
            </div>
        </div>
    );
}
