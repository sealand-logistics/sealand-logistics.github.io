import OrangeBg from '../assets/OragngeBg.png';
import { clients } from '../data/clients';

interface ClientsSectionProps {
    limit?: boolean;
}

const ClientsSection = ({ limit = false }: ClientsSectionProps) => {
    // Show 15 items (3 rows * 5 cols) if limited, otherwise show all
    const displayClients = limit ? clients.slice(0, 15) : clients;

    return (
        <section className="bg-white">
            {/* Header Section */}
            <div
                className="w-full py-20 px-[15px] md:px-[60px]"
                style={{
                    backgroundImage: `url(${OrangeBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container mx-auto">
                    <h2 className="text-[32px] md:text-5xl font-playfair font-bold !text-white mb-6 text-center md:text-left">
                        Our Valued <span className="font-playfair font-bold italic">Clients</span>
                    </h2>
                    <p className="text-white/90 font-lato text-lg max-w-4xl text-left leading-relaxed">
                        We are trusted by a diverse portfolio of businesses—from emerging SMEs to global corporations—who rely on our expertise to manage their end-to-end logistics, streamline supply chains, and ensure timely, secure cargo movement across international borders.
                    </p>
                </div>
            </div>

            {/* Logos Grid */}
            <div className="container mx-auto px-[15px] lg:px-[60px] py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-gray-100">
                    {displayClients.map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-8 h-48 border-r border-b border-gray-100 transition-shadow duration-300 bg-white"
                        >
                            <img
                                src={logo}
                                alt={`Client ${index + 1}`}
                                className="max-w-[200px] max-h-[100px] object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
