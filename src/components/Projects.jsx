import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
    {
        id: 1,
        title: 'The Obsidian Pavilion',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#0d1117' // Very dark blue/grey
    },
    {
        id: 2,
        title: 'Aura Residence',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#2d3748' // Slate
    },
    {
        id: 3,
        title: 'Neon Gallery',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#1a202c' // Darker slate
    },
    {
        id: 4,
        title: 'Zenith Tower',
        category: 'Corporate',
        image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        color: '#000000' // Black
    }
];

const Projects = () => {
    const [activeColor, setActiveColor] = useState('transparent');

    return (
        <motion.section
            className="py-32 px-4 md:px-12 lg:px-24 transition-colors duration-700 ease-in-out relative"
            animate={{ backgroundColor: activeColor }}
            style={{ backgroundColor: 'transparent' }} // Fallback
        >
            {/* Ensure base background doesn't get fully overridden if transparent */}
            {activeColor === 'transparent' && <div className="absolute inset-0 bg-lush-dark -z-10" />}

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <h2 className="text-5xl md:text-7xl font-syne font-bold uppercase text-white">
                        Selected <br /> Works
                    </h2>
                    <p className="text-gray-400 max-w-sm mt-6 md:mt-0 font-inter font-light">
                        A curated collection of our most defining architectural achievements across the globe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
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
                                    <div className="w-24 h-24 rounded-full bg-lush-accent/90 backdrop-blur-md flex items-center justify-center text-black font-syne font-bold uppercase text-sm -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                        View
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-start text-white">
                                <div>
                                    <h4 className="text-2xl font-syne font-bold mb-2 group-hover:text-lush-accent transition-colors duration-300">
                                        {project.title}
                                    </h4>
                                    <p className="text-sm font-inter text-gray-400 uppercase tracking-widest">
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
