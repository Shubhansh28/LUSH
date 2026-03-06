import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Hero = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section ref={container} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-lush-dark text-white">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{ y, scale, opacity }}
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Modern Architecture"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    className="text-center"
                >
                    <h1 className="text-[12vw] leading-none mb-0 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
                        LUSH
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-xl md:text-3xl font-inter font-light tracking-wide text-gray-200 mt-2 mb-12"
                    >
                        Visionary Architecture
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                >
                    <MagneticButton className="text-white hover:text-black border-white">
                        Explore Our Vision
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-white/30 relative overflow-hidden"
                >
                    <motion.div
                        className="w-full h-full bg-lush-accent absolute top-0 left-0"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
