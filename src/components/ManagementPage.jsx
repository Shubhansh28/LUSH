import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const managementProjects = [
    {
        id: 1,
        title: 'The Pinnacle Build',
        category: 'Commercial Development',
        image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200',
    },
    {
        id: 2,
        title: 'Harbor Restoration',
        category: 'Civic Infrastructure',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200',
    },
    {
        id: 3,
        title: 'Skyline Integration',
        category: 'High-Rise Construction',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
    },
    {
        id: 4,
        title: 'Estate Oversight',
        category: 'Luxury Contracting',
        image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1200',
    }
];

const ManagementPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 px-4 sm:px-6 md:px-12 lg:px-24"
        >
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-lush-dark">
                        Project Management
                    </h1>
                    <p className="mt-4 text-lush-dark/70 font-inter font-light max-w-2xl text-base sm:text-lg">
                        Executing complex visions with precision, overseeing every detail from conceptual blueprint to final delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {managementProjects.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                        >
                            <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-sm">
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-playfair font-bold text-lush-dark group-hover:text-lush-red transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-xs md:text-sm font-inter text-gray-500 uppercase tracking-widest mt-2">
                                    {project.category}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ManagementPage;
