import ClientsBG from '../assets/ClientsBG.png';
import { clients } from '../data/clients';

const Clients = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${ClientsBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
                        Our Valued Clients
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
                <p className="text-gray-600 font-lato text-lg max-w-4xl text-left leading-relaxed mb-12">
                    We are trusted by a diverse portfolio of businesses—from emerging SMEs to global corporations—who rely on our expertise to manage their end-to-end logistics, streamline supply chains, and ensure timely, secure cargo movement across international borders.
                </p>

                {/* Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-gray-100">
                    {clients.map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-8 h-40 border-r border-b border-gray-100 transition-shadow duration-300 bg-white"
                        >
                            <img
                                src={logo}
                                alt={`Client ${index + 1}`}
                                className="max-w-[168px] max-h-[84px] object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;
