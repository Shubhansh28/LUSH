import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
    {
        id: 1,
        title: 'The Crimson Suite',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#fdf1f1'
    },
    {
        id: 2,
        title: 'Velvet Manor',
        category: 'Luxury Estate',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#f9e8e8'
    },
    {
        id: 3,
        title: 'Noir Gallery',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#f5f5f5'
    },
    {
        id: 4,
        title: 'Opulence Tower',
        category: 'Corporate',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#fafafa'
    }
];

const Projects = () => {
    const [activeColor, setActiveColor] = useState('transparent');

    return (
        <motion.section
            className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 transition-colors duration-700 ease-in-out relative"
            animate={{ backgroundColor: activeColor }}
            style={{ backgroundColor: 'transparent' }}
        >
            {activeColor === 'transparent' && <div className="absolute inset-0 bg-white -z-10" />}

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16">
                    <div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-lush-dark normal-case">
                            Selected
                        </h2>
                        <h2 className="font-script text-4xl sm:text-5xl md:text-7xl text-lush-red normal-case -mt-2">
                            Works
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 max-w-sm mt-4 sm:mt-6 md:mt-0 font-inter font-light">
                        A curated collection of our most defining interior design achievements across the globe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                            onMouseEnter={() => setActiveColor(project.color)}
                            onMouseLeave={() => setActiveColor('transparent')}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-sm">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Discover overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-24 h-24 rounded-full bg-lush-red/90 flex items-center justify-center text-white font-playfair font-bold text-sm -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                        View
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-start text-lush-dark">
                                <div>
                                    <h4 className="text-xl sm:text-2xl font-playfair font-bold mb-2 group-hover:text-lush-red transition-colors duration-300 normal-case">
                                        {project.title}
                                    </h4>
                                    <p className="text-sm font-inter text-gray-600 uppercase tracking-widest">
                                        {project.category}
                                    </p>
                                </div>
                                <span className="text-gray-500 font-inter text-sm block mt-2">
                                    0{index + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Projects;
