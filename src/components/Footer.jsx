import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-white text-lush-dark pt-16 sm:pt-24 md:pt-32 pb-10 overflow-hidden z-40 border-t border-black/10">
            <div className="px-4 sm:px-6 md:px-12 lg:px-24 mx-auto max-w-[100rem]">

                {/* Call to Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 mb-16 sm:mb-24 md:mb-32 border-b border-black/10 pb-16 sm:pb-24 md:pb-32">
                    <div>
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-playfair leading-[1.1] mb-2 normal-case">
                            Let's create
                        </h2>
                        <h2 className="font-script text-3xl sm:text-5xl md:text-7xl text-lush-red normal-case mb-6 sm:mb-8">
                            something beautiful.
                        </h2>
                        <MagneticButton className="text-lush-dark hover:text-white border-lush-dark/40 hover:border-lush-red">
                            Start a Project
                        </MagneticButton>
                    </div>

                    <div className="flex flex-col md:items-end md:text-right justify-end gap-12">
                        <div>
                            <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-inter">Location</h4>
                            <p className="text-base sm:text-xl font-inter font-light">
                                124 Regent Street<br />
                                London, W1B 5SA
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-inter">Contact</h4>
                            <a href="mailto:hello@lushliving.com" className="text-base sm:text-xl hover:text-lush-red transition-colors duration-300 font-inter font-light flex items-center gap-2">
                                hello@lushliving.com <ArrowUpRight size={20} />
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
                        <h1 className="text-[14vw] sm:text-[16vw] md:text-[18vw] leading-none mb-0 tracking-[0.05em] sm:tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-t from-black/5 to-black/20 font-cormorant font-light select-none cursor-default normal-case">
                            LUSH
                        </h1>
                    </motion.div>

                    <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 font-inter uppercase tracking-widest mt-8">
                        <p>© {new Date().getFullYear()} <span className="font-cormorant">LUSH</span> <span className="font-slight">Living</span>. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 sm:mt-0">
                            <a href="#" className="hover:text-lush-red transition-colors">Instagram</a>
                            <a href="#" className="hover:text-lush-red transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-lush-red transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
