import IndustriesBG from '../assets/IndustriesBG.png';
import { industries } from '../data/industries';

const Industries = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${IndustriesBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
                        Industry Expertise
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
                <div className="text-center mb-16">
                    <p className="text-gray-600 font-lato text-lg max-w-2xl mx-auto">
                        Delivering specialized logistics solutions across a diverse range of sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {industries.map((industry) => (
                        <div key={industry.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group">
                            <div className="h-[200px] overflow-hidden">
                                <img
                                    src={industry.image}
                                    alt={industry.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-playfair font-bold text-[#0B1221] group-hover:text-blue-900 transition-colors">
                                    {industry.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Industries;
