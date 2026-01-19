import { Link } from 'react-router-dom';
import CTAImage from '../assets/CTA_Image.png';

const CTASection = () => {
    return (
        <section className="bg-[#FFF5EB] pt-16 md:pt-0">
            <div className="container mx-auto px-[15px] lg:px-[60px] flex flex-col md:flex-row justify-between gap-10 relative">
                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left self-center">
                    <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040]">
                        Ready to Move <br />
                        <span className="text-[#FF6B00] font-playfair font-bold italic">Your Cargo?</span>
                    </h2>
                    <p className="text-gray-600 font-lato text-lg max-w-lg mx-auto md:mx-0">
                        Partner with a trusted logistics team delivering fast, secure, and reliable end-to-end solutions across the globe.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/contact"
                            className="inline-block bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold font-lato py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end relative md:translate-y-14 z-10">
                    <img
                        src={CTAImage}
                        alt="Export Import Containers"
                        className="max-w-full h-auto object-cover transform scale-105 md:scale-110 origin-bottom"
                    />
                </div>
            </div>
        </section>
    );
};

export default CTASection;
