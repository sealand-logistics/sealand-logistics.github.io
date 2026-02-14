import { useEffect, useState } from 'react';
import axios from 'axios';
import OOGBG from '../assets/OOGBG.png';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://sealand-logistics-github-io.onrender.com/api';

interface APIProject {
    _id: string;
    image: string;
    images?: string[];
    title: string;
    description?: string;
    category: string;
}

interface ProjectData {
    id: string;
    src: string;
    images?: string[];
    title: string;
    subtitle: string;
}

const OOGProjects = () => {
    const [data, setData] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
    const [galleryProject, setGalleryProject] = useState<ProjectData | null>(null);

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
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [hoveredProject, data]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects?category=OOG`);
                const apiProjects = res.data
                    .map((p: APIProject) => ({
                        id: p._id,
                        src: p.image,
                        images: p.images && p.images.length > 0 ? p.images : [p.image],
                        title: p.title,
                        subtitle: p.description || ''
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
        setCurrentImageIndex(prev => ({ ...prev, [id]: 0 }));
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
                        OOG Project Case Studies
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
                                }}
                            >
                                <img
                                    src={activeImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300 w-full">
                                        <h3 className="text-2xl font-lato font-bold mb-1 truncate pr-4">{project.title}</h3>
                                        <p className="text-gray-200 font-lato text-sm leading-relaxed line-clamp-2 pr-4">
                                            {project.subtitle}
                                        </p>

                                        {/* Pagination dots if multiple images */}
                                        {project.images && project.images.length > 1 && (
                                            <div className="flex gap-1 mt-2 transition-opacity">
                                                {project.images.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-1.5 h-1.5 rounded-full ${idx === activeIndex ? 'bg-orange-500' : 'bg-white/50'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-3 overflow-hidden transition-all duration-500 ease-in-out">
                                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
                                                <span>View Details & Gallery</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {loading && data.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-400 italic">
                            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            Loading our case studies...
                        </div>
                    )}
                </div>
            </div>

            {/* Gallery Modal - Enhanced Full Screen View */}
            {galleryProject && (
                <div className="fixed inset-0 z-50 bg-white flex justify-center overflow-y-auto">
                    {/* Close Button - Fixed to viewport */}
                    <button
                        onClick={() => setGalleryProject(null)}
                        className="fixed top-6 right-6 text-gray-400 hover:text-black transition-all z-[60] p-4 bg-gray-100 hover:bg-gray-200 rounded-full group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="container mx-auto min-h-screen py-20 px-[15px] md:px-[60px] flex flex-col items-start">
                        <div className="text-left text-black mb-16 mt-10 w-full">
                            <h3 className="text-2xl md:text-4xl font-lato font-black mb-6 leading-tight uppercase tracking-tight">
                                {galleryProject.title}
                            </h3>
                            <div className="w-24 h-1.5 bg-orange-500 mb-10"></div>
                            <div className="w-full">
                                <p className="text-gray-700 font-lato text-base md:text-lg leading-relaxed">
                                    {galleryProject.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Image Gallery Section */}
                        <div className="w-full">
                            <h4 className="text-orange-600 font-lato font-bold uppercase tracking-widest text-sm mb-8 text-left">Project Gallery</h4>
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                                {(galleryProject.images && galleryProject.images.length > 0 ? galleryProject.images : [galleryProject.src]).map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="break-inside-avoid rounded-2xl overflow-hidden shadow-xl group relative bg-gray-50 border border-gray-100 transition-all duration-500 hover:shadow-2xl"
                                    >
                                        <img
                                            src={img}
                                            alt={`${galleryProject.title} - ${idx + 1}`}
                                            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end p-6">
                                            <span className="text-white/80 text-xs font-lato opacity-0 group-hover:opacity-100 transition-opacity">Image {idx + 1}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-20 mb-12 flex flex-col items-start gap-4">
                            <div className="w-12 h-px bg-gray-200"></div>
                            <span className="text-gray-400 text-sm tracking-widest uppercase font-lato">End of Project Details</span>
                            <button
                                onClick={() => setGalleryProject(null)}
                                className="mt-4 px-10 py-4 bg-[#000040] hover:bg-black text-white rounded-full transition-all font-lato font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Back to Case Studies
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OOGProjects;
