"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';
import AuthModal from './AuthModal';

import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    const handleLogin = (phone: string) => {
        setUser(phone);
    };

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={`${styles.logo} text-gradient`}>
                    🏏 CricketBet
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>Live</Link>
                    <Link href="/analysis" className={`${styles.link} ${pathname === '/analysis' ? styles.active : ''}`}>Market Analysis</Link>
                    <Link href="/upcoming" className={`${styles.link} ${pathname === '/upcoming' ? styles.active : ''}`}>Upcoming</Link>
                    <Link href="/tournaments" className={`${styles.link} ${pathname === '/tournaments' ? styles.active : ''}`}>Tournaments</Link>
                    <Link href="/results" className={`${styles.link} ${pathname === '/results' ? styles.active : ''}`}>Results</Link>
                </div>

                <div className={styles.actions}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>Balance</span>
                                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹5,000.00</span>
                            </div>
                            <button onClick={handleLogout} className="btn-outline" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="btn-outline"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="btn-primary"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLogin={handleLogin}
            />
        </>
    );
}
