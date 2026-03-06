import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 500); // Wait a half second at 100%
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[999] bg-lush-dark flex flex-col items-center justify-center pointer-events-none"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="text-center overflow-hidden">
                <motion.h1
                    className="text-7xl md:text-9xl font-syne font-bold text-white mb-4"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                >
                    LUSH
                </motion.h1>
            </div>

            <div className="w-64 max-w-[80vw] h-[1px] bg-white/20 mt-8 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-lush-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                />
            </div>

            <div className="mt-4 text-gray-400 font-inter text-sm tracking-widest font-light">
                {Math.min(progress, 100)}%
            </div>
        </motion.div>
    );
};

export default PageLoader;
