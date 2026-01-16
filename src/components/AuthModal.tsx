"use client";
import { useState, useEffect, useRef } from 'react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (phone: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset state when opening
            setStep('phone');
            setPhoneNumber('');
            setOtp(['', '', '', '', '', '']);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length !== 10) {
            alert("Please enter a valid 10-digit Indian number.");
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('otp');
        }, 1500);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            onLogin(`+91 ${phoneNumber}`);
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>

                {step === 'phone' ? (
                    <>
                        <h2 className={styles.title}>Welcome Back</h2>
                        <p className={styles.subtitle}>Enter your mobile number to start betting.</p>

                        <form onSubmit={handlePhoneSubmit}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.prefix}>
                                        🇮🇳 +91
                                    </div>
                                    <input
                                        type="tel"
                                        className={styles.input}
                                        placeholder="98765 43210"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            if (val.length <= 10) setPhoneNumber(val);
                                        }}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%' }}
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Get OTP'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className={styles.title}>Verify OTP</h2>
                        <p className={styles.subtitle}>Enter the 6-digit code sent to<br /><strong>+91 {phoneNumber}</strong></p>

                        <div className={styles.otpInputs}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => { otpRefs.current[i] = el }}
                                    type="text"
                                    maxLength={1}
                                    className={styles.otpDigit}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    autoFocus={i === 0}
                                />
                            ))}
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '24px' }}
                            onClick={handleVerify}
                            disabled={loading || otp.join('').length !== 6}
                        >
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>

                        <p className={styles.resend}>
                            Didn't receive code? <span className={styles.resendLink} onClick={() => alert('OTP Resent!')}>Resend</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
