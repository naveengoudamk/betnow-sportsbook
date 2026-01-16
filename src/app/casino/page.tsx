import Navbar from "@/components/Navbar";

export default function Casino() {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
                        <span className="text-gradient">Premium Casino</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-dim)', maxWidth: '600px', margin: '0 auto' }}>
                        Immerse yourself in our collection of high-stakes tables and state-of-the-art slots.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { name: 'Roulette Royale', color: '#ff4757', icon: '🎡' },
                        { name: 'Blackjack VIP', color: '#2e86de', icon: '♠️' },
                        { name: 'Ludo Supreme', color: '#f0932b', icon: '🎲' },
                        { name: 'Cyber Slots', color: '#00ff88', icon: '🎰' },
                        { name: 'Poker Tournament', color: '#feca57', icon: '🃏' },
                        { name: 'Baccarat Live', color: '#ff9ff3', icon: '🎴' },
                        { name: 'Crypto Crash', color: '#54a0ff', icon: '📉' }
                    ].map((game, i) => (
                        <div key={i} className="glass-panel" style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                height: '180px',
                                background: `linear-gradient(45deg, ${game.color} 0%, #151a23 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '3rem', opacity: 0.8 }}>{game.icon}</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{game.name}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                                        {Math.floor(Math.random() * 5000) + 100} Players
                                    </span>
                                    <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Play Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
