import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUpText = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
};

const About = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section ref={containerRef} className="py-32 px-4 md:px-12 lg:px-24 bg-lush-dark text-white relative z-30">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <motion.h2
                            className="text-lush-accent text-sm md:text-base mb-6 tracking-[0.3em]"
                            variants={fadeUpText}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            OUR PHILOSOPHY
                        </motion.h2>

                        <motion.h3
                            className="text-4xl md:text-6xl font-syne leading-[1.1] mb-8"
                            variants={fadeUpText}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            We shape <br />
                            <span className="text-gray-500 italic font-inter font-light">spaces</span> that <br />
                            shape you.
                        </motion.h3>

                        <motion.p
                            className="text-lg text-gray-400 font-inter font-light leading-relaxed mb-10"
                            variants={fadeUpText}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            At LUSH, architecture is more than just structure. It's an immersive experience designed to elevate human potential. We merge brutalist fundamentals with avant-garde elegance to create defining landmarks of the modern era.
                        </motion.p>
                    </div>

                    {/* Asymmetrical Image Grid */}
                    <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-8">
                        <motion.div
                            className="mt-12 md:mt-24"
                            initial={{ opacity: 0, y: 100 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                        >
                            <div className="relative overflow-hidden group rounded-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Modern Interior"
                                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-lush-accent/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
                        >
                            <div className="relative overflow-hidden group rounded-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Architecture Detail"
                                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-lush-accent-2/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
