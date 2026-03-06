import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-lush-dark text-white pt-32 pb-10 overflow-hidden z-40">
            <div className="px-4 md:px-12 lg:px-24 mx-auto max-w-[100rem]">

                {/* Call to Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 border-b border-white/10 pb-32">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-syne leading-[1.1] mb-8">
                            Let's build <br /> the <span className="text-lush-accent italic">future</span>.
                        </h2>
                        <MagneticButton className="text-white">
                            Start a Project
                        </MagneticButton>
                    </div>

                    <div className="flex flex-col md:items-end md:text-right justify-end gap-12">
                        <div>
                            <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Location</h4>
                            <p className="text-xl font-inter font-light">
                                124 Avant-Garde Blvd<br />
                                Neo-Tokyo, 100-0001
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Contact</h4>
                            <a href="mailto:hello@lush-arch.com" className="text-xl hover:text-lush-accent transition-colors duration-300 font-inter font-light flex items-center gap-2">
                                hello@lush-arch.com <ArrowUpRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Massive Footer Text */}
                <div className="relative w-full flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full text-center"
                    >
                        <h1 className="text-[18vw] leading-none mb-0 tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-white/10 to-white/80 drop-shadow-2xl font-syne font-bold select-none cursor-default">
                            LUSH
                        </h1>
                    </motion.div>

                    <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 font-inter uppercase tracking-widest mt-8">
                        <p>© {new Date().getFullYear()} LUSH Architecture. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 sm:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
