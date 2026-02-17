import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

const LockScreen = ({ onUnlock }) => {
    const [key, setKey] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulating HWID check and one-time key use
        const usedKeys = JSON.parse(localStorage.getItem('vander_used_keys') || '[]');
        const keyInput = key.trim();

        // Check if key is already used
        if (usedKeys.includes(keyInput)) {
            setError(true);
            alert("This key has already been used on this device."); // Simple feedback
            return;
        }

        // Validate Key Format (Vander-Key-Store usually gives specific format, accepting generic here for now)
        // Hardcoded 'ACCESS-KEY-2026' for testing, but in reality would validate against backend/pattern
        if (keyInput === 'ACCESS-KEY-2026' || keyInput.startsWith('VANDER-')) {
            // Mark key as used
            usedKeys.push(keyInput);
            localStorage.setItem('vander_used_keys', JSON.stringify(usedKeys));

            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass w-full max-w-md relative overflow-hidden"
        >
            <div className="flex flex-col items-center">
                <div className="bg-indigo-600/20 p-4 rounded-full mb-6">
                    <ShieldCheck size={48} className="text-indigo-500" />
                </div>
                <h1 className="card-title">Security Gateway</h1>
                <p className="card-subtitle">Enter your access key to proceed</p>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className={error ? 'border-red-500 bg-red-500/10' : ''}
                        />
                        <Lock className="absolute right-4 top-3 text-white/20" size={20} />
                    </div>

                    <button type="submit" className="flex items-center justify-center gap-2">
                        Authenticate <ArrowRight size={18} />
                    </button>
                </form>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-4 font-medium"
                    >
                        Access Denied. Invalid Authorization Key.
                    </motion.p>
                )}

                <div className="mt-8 pt-6 border-t border-white/10 w-full text-center">
                    <p className="text-white/40 text-xs mb-3">Don't have an access key?</p>
                    <a
                        href="https://vander-key-store.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-button inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        style={{ textDecoration: 'none', color: '#a5b4fc', border: '1px solid rgba(165,180, 252, 0.3)' }}
                    >
                        <ShieldCheck size={14} /> Get Access Key
                    </a>
                </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
    );
};

export default LockScreen;
