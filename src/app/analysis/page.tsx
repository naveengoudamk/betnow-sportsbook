import Navbar from "@/components/Navbar";
import RatioAnalyzer from "@/components/RatioAnalyzer";

export const metadata = {
    title: "Cricket Market Analysis & Ratios | CricketBet",
    description: "Advanced cricket ratio analysis, live market odds, and session predictions.",
};

export default function AnalysisPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #007bff 0%, #00ff87 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Market Analysis & Ratios
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Real-time cricket market ratios (Back/Lay), session fancy analysis, and ball-by-ball win probability modeling.
                    </p>
                </div>

                <RatioAnalyzer />

                {/* Informational Section */}
                <section style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '2rem'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#00ff87' }}>
                            Understanding Ratios & Sessions
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: '#fff', marginBottom: '0.75rem' }}>Back & Lay (Ratio)</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    The "Back" price (Blue) is the odd to win. The "Lay" price (Pink) is the odd for the team not to win.
                                    Professional traders use this ratio to lock in profits during live momentum shifts.
                                </p>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', marginBottom: '0.75rem' }}>Session / Fancy</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    Predict how many runs a team will score in a specific block of overs (e.g., first 6 overs or 10 overs).
                                    Analysis is based on pitch conditions and powerplay dynamics.
                                </p>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', marginBottom: '0.75rem' }}>Lambi (Final Score)</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    "Lambi" refers to the projected total innings score. Our real-time engine calculates this based on
                                    current run rate versus historical death-over acceleration.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
