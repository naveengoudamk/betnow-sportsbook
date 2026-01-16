import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={`${styles.logo} text-gradient`}>
                BetNow
            </Link>

            <div className={styles.navLinks}>
                <Link href="/" className={`${styles.link} ${styles.active}`}>Sports</Link>
                <Link href="/live" className={styles.link}>In-Play</Link>
                <Link href="/casino" className={styles.link}>Casino</Link>
                <Link href="/esports" className={styles.link}>Esports</Link>
            </div>

            <div className={styles.actions}>
                <button className="btn-outline">Log In</button>
                <button className="btn-primary">Sign Up</button>
            </div>
        </nav>
    );
}
