import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const formData = new FormData(e.target);
        
        try {
            const data = Object.fromEntries(formData.entries());
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus('success');
                e.target.reset();
                setTimeout(() => setStatus(null), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-0 min-h-screen bg-white flex flex-col"
        >
            <div className="flex-1 flex flex-col md:flex-row w-full">
                {/* Left Side: 1/4 (Visual/Details) */}
                <div className="md:w-[30%] lg:w-1/4 bg-lush-red p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white min-h-[50vh] md:min-h-full">
                    <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-8">Get In Touch</h2>
                    <div className="space-y-8 font-inter font-light">
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">Designer</h3>
                            <p className="text-xl font-medium">Sushmita Subudhi</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">Email</h3>
                            <a href="mailto:lushlivingindia@gmail.com" className="text-xl hover:opacity-80 transition-opacity">lushlivingindia@gmail.com</a>
                        </div>
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">Details</h3>
                            <p className="leading-relaxed text-base text-white/90">
                                Let us help you bring your vision to life. Share a few details about your project, and our design experts will reach out to schedule a consultation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: 3/4 (Form) */}
                <div className="md:w-[70%] lg:w-3/4 p-8 sm:p-12 lg:p-20 bg-gray-50 flex flex-col justify-center">
                    {status === 'success' ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center py-12"
                        >
                            <CheckCircle2 className="text-green-500 w-16 h-16 mb-6" />
                            <h2 className="text-4xl font-playfair font-bold text-lush-dark mb-4">Message Sent</h2>
                            <p className="text-gray-600 font-inter font-light text-lg">
                                Thank you for your interest in LUSH Living. Our team will contact you shortly.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="max-w-4xl w-full mx-auto">
                            <h3 className="text-4xl font-playfair font-bold text-lush-dark mb-12">Project Details</h3>
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 gap-y-12">
                                    <div className="space-y-3">
                                        <label className="text-xs uppercase tracking-widest text-gray-500 font-inter font-bold">Full Name</label>
                                        <input required name="name" type="text" placeholder="Sushmita Subudhi" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-lush-red outline-none transition-colors font-inter font-light text-lg" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs uppercase tracking-widest text-gray-500 font-inter font-bold">Email Address</label>
                                        <input required name="email" type="email" placeholder="lushlivingindia@gmail.com" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-lush-red outline-none transition-colors font-inter font-light text-lg" />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 gap-y-12">
                                    <div className="space-y-3">
                                        <label className="text-xs uppercase tracking-widest text-gray-500 font-inter font-bold">Phone Number</label>
                                        <input required name="phone" type="tel" placeholder="+44 20 7946 0000" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-lush-red outline-none transition-colors font-inter font-light text-lg" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs uppercase tracking-widest text-gray-500 font-inter font-bold">Project Type</label>
                                        <select required name="project-type" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-lush-red outline-none transition-colors font-inter font-light text-lg">
                                            <option value="">Select Type</option>
                                            <option value="Residential">Residential</option>
                                            <option value="Commercial">Commercial</option>
                                            <option value="Interior Design">Interior Design</option>
                                            <option value="Landscape Architecture">Landscape Architecture</option>
                                            <option value="Project Management">Project Management</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-inter font-bold">Project Address / Location</label>
                                    <input required name="address" type="text" placeholder="124 Regent Street, London" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-lush-red outline-none transition-colors font-inter font-light text-lg" />
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-inter font-bold">Query / Comments</label>
                                    <textarea name="comments" rows="4" placeholder="Tell us more about your project and any specific queries..." className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-lush-red outline-none transition-colors font-inter font-light text-lg resize-none"></textarea>
                                </div>
                                
                                <div className="pt-8 flex justify-end">
                                    <button disabled={status === 'submitting'} type="submit" className="w-full sm:w-auto px-16 bg-lush-dark text-white py-5 font-inter text-sm uppercase tracking-[0.3em] font-bold hover:bg-lush-red transition-colors duration-500 flex items-center justify-center gap-3 group">
                                        {status === 'submitting' ? 'Sending...' : (
                                            <>
                                                Submit Inquiry
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <p className="text-lush-red text-xs mt-4 right-0 block text-right uppercase tracking-widest">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
