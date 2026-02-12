import { useEffect, useState } from 'react';
import axios from 'axios';
import OOGBG from '../assets/OOGBG.png';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://sealand-logistics-github-io.onrender.com/api';

interface APIProject {
    _id: string;
    image: string;
    images?: string[]; // Added images array
    title: string;
    description?: string;
    category: string;
}

interface ProjectData {
    id: string;
    src: string;
    images?: string[]; // Added images array
    title: string;
    subtitle: string;
}

const OOGProjects = () => {
    const [data, setData] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
    const [galleryProject, setGalleryProject] = useState<ProjectData | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);

    useEffect(() => {
        let interval: any;
        if (hoveredProject) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => {
                    const project = data.find(p => p.id === hoveredProject);
                    if (!project || !project.images || project.images.length <= 1) return prev;

                    const currentIndex = prev[hoveredProject] || 0;
                    const nextIndex = (currentIndex + 1) % project.images.length;
                    return { ...prev, [hoveredProject]: nextIndex };
                });
            }, 1000); // Change image every 1 second
        }
        return () => clearInterval(interval);
    }, [hoveredProject, data]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects`);
                const apiProjects = res.data
                    .filter((p: APIProject) => p.category === 'OOG')
                    .map((p: APIProject) => ({
                        id: p._id,
                        src: p.image, // Main image
                        images: p.images && p.images.length > 0 ? p.images : [p.image], // All images
                        title: p.title,
                        subtitle: p.description || 'Global Logistics'
                    }));

                setData(apiProjects);
            } catch (error) {
                console.error('Error fetching OOG projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleMouseEnter = (id: string) => {
        setHoveredProject(id);
    };

    const handleMouseLeave = (id: string) => {
        setHoveredProject(null);
        setCurrentImageIndex(prev => ({ ...prev, [id]: 0 })); // Reset to first image
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${OOGBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
                        OOG Projects
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
                <div className="text-center mb-16">
                    <p className="text-gray-600 font-lato text-lg max-w-2xl mx-auto">
                        Explore our extensive portfolio of complex Out-of-Gauge shipments handled with precision and expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((project: ProjectData) => {
                        const activeIndex = currentImageIndex[project.id] || 0;
                        const activeImage = project.images ? project.images[activeIndex] : project.src;

                        return (
                            <div
                                key={project.id}
                                className="group relative rounded-xl overflow-hidden shadow-lg h-[300px] cursor-pointer"
                                onMouseEnter={() => handleMouseEnter(project.id)}
                                onMouseLeave={() => handleMouseLeave(project.id)}
                                onClick={() => {
                                    setGalleryProject(project);
                                    setGalleryIndex(0);
                                }}
                            >
                                <img
                                    src={activeImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl font-playfair font-bold mb-1">{project.title}</h3>
                                        <p className="text-gray-300 font-lato text-sm tracking-wide uppercase">{project.subtitle}</p>

                                        {/* Pagination dots if multiple images */}
                                        {project.images && project.images.length > 1 && (
                                            <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.images.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-1.5 h-1.5 rounded-full ${idx === activeIndex ? 'bg-orange-500' : 'bg-white/50'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <span>View Gallery</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {loading && data.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-400">Loading projects...</div>
                    )}
                </div>
            </div>

            {/* Gallery Modal - Grid Layout */}
            {galleryProject && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex justify-center overflow-y-auto">
                    {/* Close Button - Fixed to viewport */}
                    <button
                        onClick={() => setGalleryProject(null)}
                        className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors z-[60] p-3 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="w-full max-w-7xl min-h-screen py-16 px-4 md:px-8 flex flex-col items-center">
                        <div className="text-center text-white mb-12 mt-8 w-full">
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4 leading-tight">{galleryProject.title}</h3>
                            <p className="text-gray-400 font-lato text-base md:text-lg max-w-3xl mx-auto leading-relaxed">{galleryProject.subtitle}</p>
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
                            {(galleryProject.images && galleryProject.images.length > 0 ? galleryProject.images : [galleryProject.src]).map((img, idx) => (
                                <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-2xl group relative bg-gray-900">
                                    <img
                                        src={img}
                                        alt={`${galleryProject.title} - ${idx + 1}`}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 mb-8 text-gray-500 text-sm">
                            End of Gallery
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OOGProjects;
