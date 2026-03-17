import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';

const ProjectInquiryForm = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.target);
        
        try {
            const data = Object.fromEntries(formData.entries());
            const response = await fetch("http://localhost:5001/api/inquiry", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                e.target.reset();
                setTimeout(() => {
                    setStatus(null);
                    onClose();
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-lush-dark/40 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-lush-dark/40 hover:text-lush-red transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row h-full">
                            {/* Left Side: Visual/Context */}
                            <div className="hidden md:flex md:w-1/3 bg-lush-dark p-8 flex-col justify-end text-white">
                                <h3 className="font-playfair text-3xl mb-4">Start Your Journey</h3>
                                <p className="font-inter font-light text-sm opacity-60 leading-relaxed">
                                    Let us help you bring your vision to life. Share a few details about your project, and our design experts will reach out.
                                </p>
                            </div>

                            {/* Right Side: Form */}
                            <div className="flex-1 p-8 sm:p-12">
                                {status === 'success' ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <CheckCircle2 className="text-green-500 w-16 h-16 mb-6" />
                                        <h2 className="text-3xl font-playfair font-bold text-lush-dark mb-4">Message Sent</h2>
                                        <p className="text-gray-600 font-inter font-light">
                                            Thank you for your interest in LUSH Living. Our team will contact you shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-playfair font-bold text-lush-dark mb-8">Project Details</h2>
                                        
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-inter font-bold">Full Name</label>
                                                    <input 
                                                        required
                                                        name="name"
                                                        type="text"
                                                        placeholder="Sushmita Subudhi"
                                                        className="w-full border-b border-gray-200 py-2 focus:border-lush-red outline-none transition-colors font-inter font-light"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-inter font-bold">Email Address</label>
                                                    <input 
                                                        required
                                                        name="email"
                                                        type="email"
                                                        placeholder="lushlivingindia@gmail.com"
                                                        className="w-full border-b border-gray-200 py-2 focus:border-lush-red outline-none transition-colors font-inter font-light"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-inter font-bold">Phone Number</label>
                                                    <input 
                                                        required
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="+44 20 7946 0000"
                                                        className="w-full border-b border-gray-200 py-2 focus:border-lush-red outline-none transition-colors font-inter font-light"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-inter font-bold">Project Type</label>
                                                    <select 
                                                        required
                                                        name="project-type"
                                                        className="w-full border-b border-gray-200 py-2 focus:border-lush-red outline-none transition-colors font-inter font-light bg-white"
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="Residential">Residential</option>
                                                        <option value="Commercial">Commercial</option>
                                                        <option value="Interior Design">Interior Design</option>
                                                        <option value="Landscape Architecture">Landscape Architecture</option>
                                                        <option value="Project Management">Project Management</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-inter font-bold">Project Address / Location</label>
                                                <input 
                                                    required
                                                    name="address"
                                                    type="text"
                                                    placeholder="124 Regent Street, London"
                                                    className="w-full border-b border-gray-200 py-2 focus:border-lush-red outline-none transition-colors font-inter font-light"
                                                />
                                            </div>

                                            <div className="pt-6">
                                                <button
                                                    disabled={status === 'submitting'}
                                                    type="submit"
                                                    className="w-full bg-lush-dark text-white py-4 font-inter text-xs uppercase tracking-[0.3em] font-bold hover:bg-lush-red transition-colors duration-500 flex items-center justify-center gap-2 group"
                                                >
                                                    {status === 'submitting' ? 'Sending...' : (
                                                        <>
                                                            Submit Inquiry
                                                            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                                {status === 'error' && (
                                                    <p className="text-lush-red text-[10px] text-center mt-2 uppercase tracking-widest">
                                                        Something went wrong. Please try again.
                                                    </p>
                                                )}
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectInquiryForm;
