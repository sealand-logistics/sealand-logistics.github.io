import LocationsBG from '../assets/LocationsBG.png';
import PortMap from '../components/PortMap';

const Locations = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${LocationsBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
                        Our Locations
                    </h1>
                </div>
            </div>

            {/* Sea Port Services Map Section */}
            <div className="w-full px-[15px] md:px-[60px] py-16 md:py-24">
                <div className="w-full">
                    <h2 className="text-[32px] md:text-5xl font-bold text-[#000040] mb-10 text-center lg:text-left">
                        <span className="font-lato">Global Network & </span>
                        <span className="font-playfair italic">Trade Lanes</span>
                    </h2>
                    <PortMap />
                </div>
            </div>
        </div>
    );
};

export default Locations;
