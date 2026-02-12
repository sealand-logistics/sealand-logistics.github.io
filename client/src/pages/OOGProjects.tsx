import { useEffect, useState } from 'react';
import axios from 'axios';
import OOGBG from '../assets/OOGBG.png';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://sealand-logistics-github-io.onrender.com/api';

interface APIProject {
    _id: string;
    image: string;
    title: string;
    description?: string;
    category: string;
}

interface ProjectData {
    id: string;
    src: string;
    title: string;
    subtitle: string;
}

const OOGProjects = () => {
    const [data, setData] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/projects`);
                const apiProjects = res.data
                    .filter((p: APIProject) => p.category === 'OOG')
                    .map((p: APIProject) => ({
                        id: p._id,
                        src: p.image,
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
                    {data.map((project: ProjectData) => (
                        <div key={project.id} className="group relative rounded-xl overflow-hidden shadow-lg h-[300px] cursor-pointer">
                            <img
                                src={project.src}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-playfair font-bold mb-1">{project.title}</h3>
                                    <p className="text-gray-300 font-lato text-sm tracking-wide uppercase">{project.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && data.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-400">Loading projects...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OOGProjects;
