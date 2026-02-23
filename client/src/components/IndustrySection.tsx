import { Link } from 'react-router-dom';
import { industries as staticIndustries } from '../data/industries';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../config';

/*
interface APIIndustry {
    _id: string;
    title: string;
    image: string;
}
*/

const IndustrySection = () => {
    const [dynamicIndustries, setDynamicIndustries] = useState<any[]>([]);

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects?category=Industry`);
                if (res.data && res.data.length > 0) {
                    setDynamicIndustries(res.data);
                }
            } catch (error) {
                console.error('Error fetching dynamic industries:', error);
            }
        };
        fetchIndustries();
    }, []);

    const data = dynamicIndustries.length > 0 ? dynamicIndustries : staticIndustries;

    // Split industries into 2 rows. 
    // We adjust splitting for dynamic data which might not be 16 items.
    const midPoint = Math.ceil(data.length / 2);
    const row1Industries = data.slice(0, midPoint);
    const row2Industries = data.slice(midPoint);

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="w-full px-[15px] md:px-[60px]">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040]">
                            Industry <span className="font-playfair font-bold italic text-[#0B1221]">expertise</span>
                        </h2>
                    </div>
                    <Link to="/industries" className="text-blue-600 font-lato font-medium hover:text-blue-800 transition-colors flex items-center gap-1 group/link text-lg">
                        More industries
                        <svg className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                </div>

                <div className="space-y-8">
                    {/* Row 1 - Moving Left */}
                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-8 whitespace-nowrap animate-industry-marquee">
                            {[...row1Industries, ...row1Industries].map((industry, idx) => (
                                <Link key={`row1-${idx}`} to="/industries" className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group block">
                                    <div className="h-48 overflow-hidden rounded-t-lg">
                                        <img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-playfair font-bold text-[#0B1221] mb-2 truncate">{industry.title}</h3>
                                        <div className="text-[#FF6B00] font-lato font-bold text-sm hover:text-[#E65A00] transition-colors flex items-center gap-1">
                                            Explore
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - Moving Right */}
                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-8 whitespace-nowrap animate-industry-marquee-reverse">
                            {[...row2Industries, ...row2Industries].map((industry, idx) => (
                                <Link key={`row2-${idx}`} to="/industries" className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group block">
                                    <div className="h-48 overflow-hidden rounded-t-lg">
                                        <img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-playfair font-bold text-[#0B1221] mb-2 truncate">{industry.title}</h3>
                                        <div className="text-[#FF6B00] font-lato font-bold text-sm hover:text-[#E65A00] transition-colors flex items-center gap-1">
                                            Explore
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
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
                    animation: industry-marquee 15s linear infinite;
                }
                .animate-industry-marquee-reverse {
                    animation: industry-marquee-reverse 15s linear infinite;
                }
                @media (min-width: 768px) {
                    .animate-industry-marquee {
                        animation: industry-marquee 50s linear infinite;
                    }
                    .animate-industry-marquee-reverse {
                        animation: industry-marquee-reverse 50s linear infinite;
                    }
                }
                .animate-industry-marquee:hover, .animate-industry-marquee-reverse:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default IndustrySection;
