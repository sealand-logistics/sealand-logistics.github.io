import ContactBG from '../assets/ContactBG.png';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden bg-white">
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

            {/* Contact Form Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Map Embed */}
                    <div className="h-[500px] lg:h-full">
                        <div className="embed-map-responsive h-full">
                            <div className="embed-map-container">
                                <iframe
                                    className="embed-map-frame"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src="https://maps.google.com/maps?width=600&height=400&hl=en&q=sealand%20logistics%20india&t=&z=17&ie=UTF8&iwloc=B&output=embed"
                                    title="Sealand Logistics Location"
                                />
                            </div>
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    .embed-map-responsive {
                                        position: relative;
                                        text-align: right;
                                        width: 100%;
                                        height: 100%;
                                    }
                                    .embed-map-container {
                                        overflow: hidden;
                                        background: none !important;
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                    }
                                    .embed-map-frame {
                                        width: 100% !important;
                                        height: 100% !important;
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                    }
                                `
                            }} />
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="bg-[#F8F8FF] p-6 rounded-lg">
                        <div className="space-y-6">
                            {/* Full Name and Company */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-lato font-medium text-gray-700 mb-2">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name here"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-lato font-medium text-gray-700 mb-2">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter company name"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato"
                                    />
                                </div>
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-lato font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email here"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-lato font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter phone number here"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato"
                                    />
                                </div>
                            </div>

                            {/* Service Required */}
                            <div>
                                <label className="block text-sm font-lato font-medium text-gray-700 mb-2">
                                    Service required
                                </label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato text-gray-500">
                                    <option>Select service</option>
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
                                <label className="block text-sm font-lato font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Enter your message here"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent font-lato resize-none"
                                />
                            </div>

                            {/* Terms and Submit */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-[#FF6600] border-gray-300 rounded focus:ring-[#FF6600]"
                                    />
                                    <span className="ml-2 text-sm font-lato text-gray-600">
                                        I agree with Terms of Use and Privacy Policy
                                    </span>
                                </label>
                            </div>

                            <button className="bg-[#FF6600] hover:bg-[#E65A00] text-white font-lato font-bold py-3 px-12 rounded-full transition-colors duration-300 shadow-lg">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
