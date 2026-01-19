import { Link } from 'react-router-dom';
import Img1 from '../assets/OOG/1.png';
import Img2 from '../assets/OOG/2.png';
import Img3 from '../assets/OOG/3.png';
import Img4 from '../assets/OOG/4.png';
import Img5 from '../assets/OOG/5.png';
import Img6 from '../assets/OOG/6.png';
import Img7 from '../assets/OOG/7.png';
import Img8 from '../assets/OOG/8.png';
import Img9 from '../assets/OOG/9.png';
import Img10 from '../assets/OOG/10.png';
import Img11 from '../assets/OOG/11.png';
import Img12 from '../assets/OOG/12.png';

const OOGSection = () => {
    // 12 images total, split into 2 rows of 6
    const row1Images = [Img1, Img2, Img3, Img4, Img5, Img6];
    const row2Images = [Img7, Img8, Img9, Img10, Img11, Img12];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-[15px] lg:px-[60px] mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
                <div>
                    <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040]">
                        OOG Projects <span className="font-playfair font-bold italic text-blue-900">in Action</span>
                    </h2>
                </div>
                <Link
                    to="/contact"
                    className="hidden md:inline-block bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold font-lato py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
                >
                    Get a Quote
                </Link>
            </div>

            {/* Carousel Container */}
            <div className="space-y-6">
                {/* Row 1 - Moving Left */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-6 whitespace-nowrap animate-marquee">
                        {/* Render twice for seamless loop */}
                        {[...row1Images, ...row1Images].map((src, idx) => (
                            <div key={`r1-${idx}`} className="flex-shrink-0 w-[400px] h-[250px] rounded-xl overflow-hidden shadow-md">
                                <img src={src} alt={`OOG Project ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Moving Right */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-6 whitespace-nowrap animate-marquee-reverse">
                        {/* Render twice for seamless loop */}
                        {[...row2Images, ...row2Images].map((src, idx) => (
                            <div key={`r2-${idx}`} className="flex-shrink-0 w-[400px] h-[250px] rounded-xl overflow-hidden shadow-md">
                                <img src={src} alt={`OOG Project ${idx + 7}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <Link to="/oog-projects" className="text-blue-600 font-lato text-lg hover:text-blue-800 transition-colors flex items-center justify-center gap-2">
                    View all projects
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); } /* Changed to -100% for full width scroll if needed, or adjust based on width */
                }
                /* Adjusting keyframes for smoother continuous loop based on content width */
                 @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } /* Assuming content is duplicated once */
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite; /* Slowed down slightly for better view */
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 40s linear infinite;
                }
                .animate-marquee:hover, .animate-marquee-reverse:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default OOGSection;
