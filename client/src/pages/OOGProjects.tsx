import OOGBG from '../assets/OOGBG.png';
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

const OOGProjects = () => {
    const projects = [
        { id: 1, src: Img1, title: 'Turbine Transport', subtitle: 'Heavy Lift / Europe' },
        { id: 2, src: Img2, title: 'Industrial Boiler', subtitle: 'Road Transport / Germany' },
        { id: 3, src: Img3, title: 'Power Generator', subtitle: 'Multimodal / Asia' },
        { id: 4, src: Img4, title: 'Construction Machinery', subtitle: 'Breakbulk / USA' },
        { id: 5, src: Img5, title: 'Wind Blades', subtitle: 'Special Trailer / Denmark' },
        { id: 6, src: Img6, title: 'Factory Relocation', subtitle: 'Project Cargo / Global' },
        { id: 7, src: Img7, title: 'Mining Equipment', subtitle: 'Out of Gauge / Australia' },
        { id: 8, src: Img8, title: 'Oil & Gas Modules', subtitle: 'Sea Freight / Middle East' },
        { id: 9, src: Img9, title: 'Railway Locomotives', subtitle: 'Rail Transport / Africa' },
        { id: 10, src: Img10, title: 'Marine Vessels', subtitle: 'Heavy Lift / South America' },
        { id: 11, src: Img11, title: 'Aerospace Parts', subtitle: 'Air Freight / North America' },
        { id: 12, src: Img12, title: 'Infrastructure Beams', subtitle: 'Special Transport / Asia' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden bg-white">
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
                    {projects.map((project) => (
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
                </div>
            </div>
        </div>
    );
};

export default OOGProjects;
