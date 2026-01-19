import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { industries } from '../data/industries';

const IndustrySection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 400; // Adjust scroll amount as needed
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="w-full px-[15px] md:px-[60px]">
                <div className="text-center mb-12">
                    <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040]">
                        Industry <span className="font-playfair font-bold italic text-[#0B1221]">expertise</span>
                    </h2>
                </div>

                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-800 shadow-lg"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-800 shadow-lg"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Carousel */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {industries.map((industry) => (
                            <div key={industry.id} className="flex-shrink-0 w-[calc(100%-32px)] sm:w-[calc((100%-32px)/2)] md:w-[calc((100%-64px)/3)] lg:w-[calc((100%-96px)/4)] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="h-[200px] overflow-hidden rounded-t-lg">
                                    <img
                                        src={industry.image}
                                        alt={industry.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-playfair font-bold text-[#0B1221] mb-2">{industry.title}</h3>
                                    <Link to="/industries" className="text-[#FF6B00] font-lato font-bold text-sm hover:text-[#E65A00] transition-colors flex items-center gap-1 group/link">
                                        Explore
                                        <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link to="/industries" className="text-blue-600 font-lato font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-1">
                        More industries <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default IndustrySection;
