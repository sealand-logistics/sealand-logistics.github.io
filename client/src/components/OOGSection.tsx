import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_BASE_URL = 'https://sealand-logistics-github-io.onrender.com/api';

interface APIProject {
    _id: string;
    image: string;
    category: string;
}

const OOGSection = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOOG = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects`);
                const apiImages = res.data
                    .filter((p: APIProject) => p.category === 'OOG')
                    .map((p: APIProject) => p.image);

                setImages(apiImages);
            } catch (error) {
                console.error('Error fetching OOG projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOOG();
    }, []);

    // Split images into 3 rows for the marquee
    const chunkArray = (arr: string[], size: number) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const rowSize = Math.max(Math.ceil(images.length / 3), 1);
    const rows = chunkArray(images, rowSize);

    // Fill empty rows if needed
    while (rows.length < 3) rows.push([]);

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
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative w-full overflow-hidden">
                        <div className={`flex gap-6 whitespace-nowrap ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
                            {(row.length > 0 ? [...row, ...row] : []).map((src, idx) => (
                                <div key={`${rowIndex}-${idx}`} className="flex-shrink-0 w-[400px] h-[250px] rounded-xl overflow-hidden shadow-md">
                                    <img src={src} alt={`OOG Project ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {loading && images.length === 0 && (
                    <div className="text-center py-10 text-gray-400">Loading projects...</div>
                )}
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
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
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
