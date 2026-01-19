import CertificationsSection from '../components/CertificationsSection';
import CertificationsBG from '../assets/CertificationsBG.png';

const Certifications = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${CertificationsBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-sm text-center">
                        Our Certifications
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            {/* Since CertificationsSection has its own container and padding, we render it directly. 
                If we need global consistency with margins, we might wrap it, but Services page 
                uses ServicesSection directly (after moving it out). 
            */}
            <CertificationsSection showTitle={false} />
        </div>
    );
};

export default Certifications;
