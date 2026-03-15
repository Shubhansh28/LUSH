import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const PageLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading');

    const startExit = useCallback(() => {
        setPhase('exiting');
        setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 1300);
    }, [onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 12) + 5;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100 && phase === 'loading') {
            const t = setTimeout(() => startExit(), 400);
            return () => clearTimeout(t);
        }
    }, [progress, phase, startExit]);

    const title = "LUSH";
    if (phase === 'done') return null;
    const isExiting = phase === 'exiting';

    return (
        <div className="fixed inset-0 z-[999] pointer-events-none">

            {/* White background */}
            <motion.div
                className="absolute inset-0 bg-white z-[4] transform-gpu"
                animate={isExiting ? { y: '-100%' } : { y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.3 : 0 }}
            />

            {/* Sweeping red panels */}
            <motion.div
                className="absolute inset-0 bg-lush-red-dark z-[3] transform-gpu"
                initial={{ y: '100%' }}
                animate={isExiting ? { y: '-100%' } : { y: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.3 : 0 }}
            />
            <motion.div
                className="absolute inset-0 bg-lush-red z-[2] transform-gpu"
                initial={{ y: '100%' }}
                animate={isExiting ? { y: '-100%' } : { y: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.15 : 0 }}
            />
            <motion.div
                className="absolute inset-0 bg-lush-red-light z-[1] transform-gpu"
                initial={{ y: '100%' }}
                animate={isExiting ? { y: '-100%' } : { y: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }}
            />

            {/* Content */}
            <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center">
                <motion.div
                    className="flex flex-col items-center transform-gpu"
                    animate={isExiting ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeIn' }}
                >
                    {/* Staggered LUSH text */}
                    <div className="flex overflow-hidden pb-2">
                        {title.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                className="text-7xl md:text-[10vw] font-cormorant font-light text-lush-dark leading-none tracking-[0.15em] transform-gpu"
                                initial={{ y: '100%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: index * 0.1 }}
                                style={{ willChange: 'transform, opacity' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    {/* "Living" in script */}
                    <motion.span
                        className="font-slight text-3xl sm:text-4xl md:text-6xl text-lush-red -mt-1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Living
                    </motion.span>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    className="w-64 max-w-[80vw] h-[1px] bg-lush-dark/20 mt-10 relative overflow-hidden rounded-full transform-gpu"
                    animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-lush-dark via-lush-red to-lush-red"
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ ease: 'circOut' }}
                    />
                </motion.div>

                <motion.div
                    className="mt-4 text-lush-dark/60 font-inter text-xs tracking-[0.3em] uppercase"
                    animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {Math.min(progress, 100)}%
                </motion.div>
            </div>
        </div>
    );
};

export default PageLoader;
