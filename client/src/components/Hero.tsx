import { Link } from 'react-router-dom';
import HeroImage from '../assets/Hero_Image.png';

const Hero = () => {
    return (
        <div className="relative h-[800px] w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${HeroImage})` }}
            >
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-start pt-48 mt-36 items-center text-center text-white px-4 md:px-0">
                <div className=" mx-auto">
                    <h1 className="mb-6 leading-tight">
                        <span className="block font-playfair font-bold italic text-[32px] md:text-7xl mb-2">
                            End to end Logistics.
                        </span>
                        <span className="block font-lato font-bold text-[32px] md:text-6xl tracking-wide">
                            Global Reach. Indian Expertise.
                        </span>
                    </h1>

                    <p className="font-lato text-gray-200 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                        End-to-end OOG, Project cargo, Reefer, Cross-Border, multi modal logistics experts, with networks across 180+ countries.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="px-8 py-3 bg-[#fd7e14] hover:bg-[#e36d0d] text-white font-lato font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                        >
                            Get a Quote
                        </Link>
                        <button className="px-8 py-3 bg-transparent border-2 border-white/30 hover:bg-white/10 text-white font-lato font-medium rounded-full transition-all duration-300 backdrop-blur-sm">
                            Speak to an Expert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
