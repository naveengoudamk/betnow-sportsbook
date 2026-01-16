import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <span className={styles.badge}>Live Premier League Action</span>
                <h1 className={styles.title}>
                    Elevate Your <span className="text-gradient">Game</span>
                </h1>
                <p className={styles.subtitle}>
                    Experience the thrill of next-generation sports betting with real-time odds, instant payouts, and premium insights.
                </p>
                <div className={styles.ctaGroup}>
                    <button className="btn-primary">Bet Now</button>
                    <button className="btn-outline">View Live Odds</button>
                </div>
            </div>
        </div>
    );
}
