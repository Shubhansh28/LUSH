import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 px-4 sm:px-6 md:px-12 lg:px-24 min-h-screen bg-white"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-lush-dark mb-8">
                        About LUSH
                    </h1>
                    
                    <div className="space-y-8 text-lush-dark/80 font-inter font-light text-lg leading-relaxed">
                        <p>
                            Founded on the principles of timeless elegance and contemporary sophistication, LUSH Living began as a vision to redefine the boundaries of interior design and architectural excellence.
                        </p>
                        
                        <div className="py-12 border-y border-lush-dark/10 my-12">
                            <h2 className="text-lush-red text-sm uppercase tracking-[0.3em] font-bold mb-6">Our Mission</h2>
                            <p className="text-2xl md:text-3xl font-playfair italic text-lush-dark">
                                "To create spaces that don't just exist, but breathe with the souls of those who inhabit them."
                            </p>
                        </div>
                        
                        <p>
                            We specialize in narrating the unique stories of our clients through meticulously curated materials, bespoke furnishings, and an unwavering attention to detail. Our team of visionary designers and architects work in harmony to transform concepts into immersive physical realities.
                        </p>
                        
                        <p>
                            Whether it's a private residential estate, a luxury hospitality destination, or a visionary commercial space, we bring a signature touch of "Layered Luxury" to every square inch we touch.
                        </p>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Years of Excellence', value: '15+' },
                            { label: 'Global Projects', value: '200+' },
                            { label: 'Design Awards', value: '45' },
                            { label: 'Creative Minds', value: '30' }
                        ].map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl font-playfair font-bold text-lush-red">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest text-lush-dark/50 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutPage;
