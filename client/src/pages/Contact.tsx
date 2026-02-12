import React, { useState } from 'react';
import axios from 'axios';
import ContactBG from '../assets/ContactBG.png';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://sealand-logistics-github-io.onrender.com/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Select service',
        message: '',
        agreed: false
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert('Please agree to the Terms and Privacy Policy');
            return;
        }
        if (formData.service === 'Select service') {
            alert('Please select a service');
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/contacts`, formData);
            setStatus({ type: 'success', msg: 'Thank you! Your message has been sent successfully.' });
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                service: 'Select service',
                message: '',
                agreed: false
            });
        } catch (error) {
            setStatus({ type: 'error', msg: 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${ContactBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* Contact Details Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 mb-12">
                    {/* Left Column - Heading & Description */}
                    <div className="lg:w-[40%]">
                        <h2 className="text-[32px] md:text-5xl lg:text-6xl font-playfair font-bold text-[#000040] leading-tight mb-8">
                            Let's Move <span className="italic">Your Cargo</span> Forward
                        </h2>
                        <p className="text-gray-700 font-lato text-lg md:text-xl leading-relaxed max-w-lg">
                            Get in touch with us for customized logistics solutions, competitive quotations, or service-related support. Our team will respond promptly and assist you at every stage.
                        </p>
                    </div>

                    {/* Right Column - Info Cards & Port Services */}
                    <div className="lg:w-[60%] flex flex-col gap-8">
                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email Card */}
                            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-1">
                                    <p className="text-gray-500 font-lato text-sm font-medium">Email</p>
                                    <p className="text-[#000040] font-lato font-semibold text-sm">corporate@sealandlogisticsgroup.com</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Call Card */}
                            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-1">
                                    <p className="text-gray-500 font-lato text-sm font-medium">Call / Whatsapp</p>
                                    <p className="text-[#000040] font-lato font-semibold text-sm">+91 8013330628 / +91 9830789141</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.915l-1.007.755a.75.75 0 0 0-.15.98 11.235 11.235 0 0 0 4.96 4.96.75.75 0 0 0 .98-.15l.755-1.007a1.875 1.875 0 0 1 1.915-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Corporate Office Card */}
                            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-1">
                                    <p className="text-gray-500 font-lato text-sm font-medium">Corporate Office</p>
                                    <p className="text-[#000040] font-lato font-semibold text-xs md:text-sm">9th Floor,Park NX, 43 Rafi Ahmed Kidwai Road, Kolkata - 700016</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 15a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75 0.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Registered Office Card */}
                            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-1">
                                    <p className="text-gray-500 font-lato text-sm font-medium">Registered office</p>
                                    <p className="text-[#000040] font-lato font-semibold text-xs md:text-sm">2B, 30 Rafi Ahmed Kidwai Road, Kolkata - 700016</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v16.242c0 .51.44 1.123.962 1.037l14.182-2.352a.75.75 0 0 0 .63-.74l-.022-12.473a.75.75 0 0 0-.744-.714ZM5.25 18.75h1.5a.75.75 0 0 0 .75-.75V7.95l-2.25 1.2V18.75Zm4.5-9.45a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Zm-.75 4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.5-6.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Zm-.75 4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Locations Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] pb-16 md:pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Location cards here */}
                    {/* ... (keeping original cards for brevity but they are standard) */}
                    {/* Mumbai */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                            <p className="text-gray-500 font-lato text-xs font-medium uppercase tracking-wider">Mumbai</p>
                            <p className="text-[#000040] font-lato font-semibold text-xs leading-relaxed">Vaswani Chambers, Dr Annie Besant Rd, Worli, Mumbai 400025</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054a8.25 8.25 0 0 0 5.58.652l3.109-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.158l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {/* Chennai */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                            <p className="text-gray-500 font-lato text-xs font-medium uppercase tracking-wider">Chennai</p>
                            <p className="text-[#000040] font-lato font-semibold text-xs leading-relaxed">Mount Chambers, No: 758A, Anna Salai, Chennai – 600 002</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054a8.25 8.25 0 0 0 5.58.652l3.109-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.158l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {/* Hyderabad */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                            <p className="text-gray-500 font-lato text-xs font-medium uppercase tracking-wider">Hyderabad</p>
                            <p className="text-[#000040] font-lato font-semibold text-xs leading-relaxed">6th Floor, N Heights, Plot No 38, Phase 2 Hitec City, Hyderabad</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054a8.25 8.25 0 0 0 5.58.652l3.109-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.158l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {/* Delhi & NCR */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                            <p className="text-gray-500 font-lato text-xs font-medium uppercase tracking-wider">Delhi & NCR</p>
                            <p className="text-[#000040] font-lato font-semibold text-xs leading-relaxed">07th Floor, Ambience Island, NH 48, Gurugram, 122002</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00008B] flex items-center justify-center text-white shrink-0 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054a8.25 8.25 0 0 0 5.58.652l3.109-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.158l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Map Embed */}
                    <div className="h-[500px] lg:h-full min-h-[400px]">
                        <iframe
                            className="w-full h-full border-0 rounded-2xl"
                            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=sealand%20logistics%20india&t=&z=17&ie=UTF8&iwloc=B&output=embed"
                            title="Sealand Logistics Location"
                        />
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="bg-[#F8F8FF] p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Status Message */}
                            {status && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {status.msg}
                                </div>
                            )}

                            {/* Full Name and Company */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Full name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter full name here"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email here"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter phone number here"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato transition-all"
                                    />
                                </div>
                            </div>

                            {/* Service Required */}
                            <div>
                                <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Service required</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato text-gray-600 appearance-none bg-no-repeat bg-[right_1rem_center] transition-all"
                                >
                                    <option disabled>Select service</option>
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
                                <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Enter your message here"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato resize-none transition-all"
                                />
                            </div>

                            {/* Terms and Submit */}
                            <div className="flex flex-col gap-6">
                                <label className="flex items-center group cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreed"
                                        checked={formData.agreed}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-[#FF6600] border-gray-300 rounded focus:ring-[#FF6600] cursor-pointer"
                                    />
                                    <span className="ml-3 text-sm font-lato text-gray-600 group-hover:text-gray-900 transition-colors">
                                        I agree with Terms of Use and Privacy Policy
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-[#FF6600] hover:bg-[#E65A00] text-white font-lato font-bold py-4 px-16 rounded-full transition-all duration-300 shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
