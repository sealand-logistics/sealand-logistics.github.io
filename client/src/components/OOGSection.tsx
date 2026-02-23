import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QuoteModal from './QuoteModal';
import { API_BASE_URL } from '../config';

/*
interface APIProject {
    _id: string;
    image: string;
    category: string;
}
*/

const OOGSection = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOOG = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects?category=OOG`);
                const apiImages = res.data
                    .map((p: any) => p.image);

                setImages(apiImages);
            } catch (error) {
                console.error('Error fetching OOG projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOOG();
    }, []);

    // Optimized distribution for better visual flow
    const getRows = () => {
        if (images.length === 0) return [[], [], []];

        // If 1-3 images, just use one or two rows to avoid massive duplication
        if (images.length === 1) {
            return [[images[0]], [], []];
        }
        if (images.length === 2) {
            return [[images[0]], [images[1]], []];
        }

        // Standard 3-row distribution for 3+ images
        const rows: string[][] = [[], [], []];
        images.forEach((img, i) => {
            rows[i % 3].push(img);
        });
        return rows;
    };

    const rows = getRows();

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="w-full px-[15px] lg:px-[60px] mb-12 text-center">
                <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-4">
                    OOG <span className="font-playfair font-bold italic text-blue-900">Projects</span>
                </h2>
                <Link to="/oog-projects" className="text-blue-600 font-lato text-lg hover:text-blue-800 transition-colors inline-flex items-center gap-2 group/link">
                    View all OOG Projects
                    <svg className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
            </div>

            {/* Carousel Container */}
            <div className="space-y-6">
                {images.length === 1 ? (
                    // Single image case: No marquee to avoid "duplicate" look
                    <div className="flex justify-center px-4">
                        <Link to="/oog-projects" className="w-full max-w-[600px] h-[350px] rounded-2xl overflow-hidden shadow-2xl group block">
                            <img
                                src={images[0]}
                                alt="OOG Project"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </Link>
                    </div>
                ) : (
                    // Multi-image case: Marquee slider
                    rows.map((row, rowIndex) => row.length > 0 && (
                        <div key={rowIndex} className="relative w-full overflow-hidden">
                            <div className={`flex gap-6 whitespace-nowrap ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
                                {[...row, ...row, ...row].map((src, idx) => (
                                    <Link key={`${rowIndex}-${idx}`} to="/oog-projects" className="flex-shrink-0 w-[400px] h-[250px] rounded-xl overflow-hidden shadow-md group block">
                                        <img src={src} alt={`OOG Project ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {loading && images.length === 0 && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {!loading && images.length === 0 && (
                    <div className="text-center py-10 text-gray-400 italic font-lato">
                        No OOG projects to display at the moment.
                    </div>
                )}
            </div>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

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
