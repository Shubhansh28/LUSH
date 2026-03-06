import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Hero = ({ onExploreClick }) => {
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
                className="absolute inset-0 w-full h-full transform-gpu"
                style={{ y, scale, opacity }}
            >
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
                {/* Watermark Logo */}
                <img
                    src="/lush-logo.png?v=2"
                    alt=""
                    className="absolute top-2 left-2 md:top-4 md:left-4 h-20 md:h-28 w-auto opacity-50 pointer-events-none select-none"
                    aria-hidden="true"
                />
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    className="text-center transform-gpu"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {/* LUSH in serif */}
                    <h1 className="text-[14vw] leading-[0.85] mb-0 tracking-[0.12em] font-playfair font-light text-white">
                        LUSH
                    </h1>

                    {/* "Living" in script font */}
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="font-script text-5xl md:text-7xl text-lush-gold -mt-2 md:-mt-3"
                    >
                        Living
                    </motion.p>
                </motion.div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="text-center mt-8 mb-12 transform-gpu"
                    style={{ willChange: 'opacity' }}
                >
                    <p className="text-lg md:text-2xl font-inter font-light tracking-wide text-lush-cream/70">
                        ....Layered in <span className="font-script text-2xl md:text-4xl text-lush-gold">luxury</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                >
                    <MagneticButton onClick={onExploreClick} className="text-white hover:text-white border-lush-gold/40 hover:border-lush-red">
                        Explore Our Vision
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
            >
                <span className="text-xs uppercase tracking-widest text-lush-gold/40">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-white/20 relative overflow-hidden transform-gpu"
                >
                    <motion.div
                        className="w-full h-full bg-lush-red absolute top-0 left-0"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
