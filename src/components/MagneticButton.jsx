import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = '', onClick }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex items-center justify-center px-8 py-4 font-playfair font-bold uppercase tracking-widest text-sm overflow-hidden rounded-full border border-lush-dark/20 hover:border-lush-red transition-colors duration-300 group ${className}`}
            data-magnetic
        >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {children}
            </span>
            {/* Hover Background Fill effect - now red */}
            <motion.div
                className="absolute inset-0 bg-lush-red origin-bottom translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
            />
        </motion.button>
    );
};

export default MagneticButton;
