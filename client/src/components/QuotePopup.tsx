import { useState } from 'react';

const QuotePopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Reset and close after a delay if desired
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#000040]/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Popup Content */}
            <div className="relative bg-white w-full max-w-xl md:max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[#FF6600] transition-colors p-2 z-10"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="p-8 md:p-10">
                    {isSubmitted ? (
                        <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-lato font-bold text-[#000040] mb-2">Thank You!</h2>
                            <p className="text-gray-500 font-lato">Your request has been submitted successfully. We will contact you shortly.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-lato font-bold text-[#000040] mb-1">
                                    Request a Quote
                                </h2>
                                <p className="text-gray-500 font-lato text-sm">Fill out the form below and our team will get back to you shortly.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name and Company */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-lato font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                            Full name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Enter full name"
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] font-lato transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-lato font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                            Company
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Enter company name"
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] font-lato transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-lato font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                            Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="name@company.com"
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] font-lato transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-lato font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                            Phone Number
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] font-lato transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Service Required */}
                                <div>
                                    <label className="block text-xs font-lato font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                        Service required
                                    </label>
                                    <select required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] font-lato text-gray-500 transition-all cursor-pointer text-sm appearance-none">
                                        <option value="">Select a service</option>
                                        <option>Ocean Freight</option>
                                        <option>Air Freight</option>
                                        <option>Domestic Trucking</option>
                                        <option>OOG Project Cargo</option>
                                        <option>Reefer Logistics</option>
                                        <option>Customs Clearance</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-lato font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] font-lato resize-none transition-all text-sm"
                                    />
                                </div>

                                <button type="submit" className="w-full bg-[#FF6600] hover:bg-[#E65A00] text-white font-lato font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF6600]/20 transform hover:-translate-y-0.5 mt-2">
                                    Get Quote
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuotePopup;
