import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = ({ onMenuClick }) => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setScrolled(latest > 50);
        });
    }, [scrollY]);

    // Animate background opacity based on scroll
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
    const borderColorOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none"
            style={{
                backgroundColor: `rgba(255, 255, 255, ${bgOpacity.get()})`,
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: `1px solid rgba(0, 0, 0, ${borderColorOpacity.get()})`
            }}
        >
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6 pointer-events-auto">
                {/* Logo Area */}
                <div className="flex items-center opacity-0">
                    <img
                        src="/lush-logo.png?v=2"
                        alt="LUSH Logo"
                        className="h-8 md:h-10 w-auto"
                    />
                </div>

                {/* Hamburger Button */}
                <button
                    onClick={onMenuClick}
                    className="group flex items-center justify-center w-12 h-12 rounded-full border border-lush-dark/20 hover:border-lush-red/50 hover:bg-lush-red/10 transition-all duration-300 overflow-hidden"
                    aria-label="Open menu"
                >
                    <div className="flex flex-col items-end gap-1.5 w-5">
                        <span className="w-full h-[1.5px] bg-lush-dark group-hover:bg-lush-red transition-colors duration-300" />
                        <span className="w-3/4 h-[1.5px] bg-lush-dark group-hover:w-full group-hover:bg-lush-red transition-all duration-300" />
                    </div>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
