import ContactBG from '../assets/ContactBG.png';
import PortMap from '../components/PortMap';


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
                                    <p className="text-gray-500 font-lato text-sm font-medium">You can email here</p>
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
                                    <p className="text-gray-500 font-lato text-sm font-medium">Call us on</p>
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

            {/* Sea Port Services Map Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] pb-16 md:pb-20">
                <h2 className="text-[32px] md:text-5xl font-playfair font-bold italic text-[#000040] mb-10 text-center lg:text-left">
                    Sea Port Services
                </h2>
                <PortMap />
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
