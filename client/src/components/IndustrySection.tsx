import { Link } from 'react-router-dom';
import { industries } from '../data/industries';

const IndustrySection = () => {
    // 16 industries total, split into 2 rows of 8
    const row1Industries = industries.slice(0, 8);
    const row2Industries = industries.slice(8, 16);

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="w-full px-[15px] md:px-[60px]">
                <div className="text-center mb-12">
                    <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040]">
                        Industry <span className="font-playfair font-bold italic text-[#0B1221]">expertise</span>
                    </h2>
                </div>

                <div className="space-y-8">
                    {/* Row 1 - Moving Left */}
                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-8 whitespace-nowrap animate-industry-marquee">
                            {[...row1Industries, ...row1Industries].map((industry, idx) => (
                                <div key={`row1-${idx}`} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="h-48 overflow-hidden rounded-t-lg">
                                        <img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-playfair font-bold text-[#0B1221] mb-2 truncate">{industry.title}</h3>
                                        <Link to="/industries" className="text-[#FF6B00] font-lato font-bold text-sm hover:text-[#E65A00] transition-colors flex items-center gap-1 group/link">
                                            Explore
                                            <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - Moving Right */}
                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-8 whitespace-nowrap animate-industry-marquee-reverse">
                            {[...row2Industries, ...row2Industries].map((industry, idx) => (
                                <div key={`row2-${idx}`} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="h-48 overflow-hidden rounded-t-lg">
                                        <img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-playfair font-bold text-[#0B1221] mb-2 truncate">{industry.title}</h3>
                                        <Link to="/industries" className="text-[#FF6B00] font-lato font-bold text-sm hover:text-[#E65A00] transition-colors flex items-center gap-1 group/link">
                                            Explore
                                            <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link to="/industries" className="text-blue-600 font-lato font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-1 text-lg">
                        More industries <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes industry-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes industry-marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-industry-marquee {
                    animation: industry-marquee 50s linear infinite;
                }
                .animate-industry-marquee-reverse {
                    animation: industry-marquee-reverse 50s linear infinite;
                }
                .animate-industry-marquee:hover, .animate-industry-marquee-reverse:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default IndustrySection;
