import AboutBG from '../assets/AboutBG.png';
import VisionImg from '../assets/OurVison.png'; // Note: filename has typo
import MissionImg from '../assets/OurMission.png';
import LeadershipSection from '../components/LeadershipSection';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 64, 0.7), rgba(0, 0, 64, 0.7)), url(${AboutBG})`,
                    }}
                >
                    <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
                        About Us
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    {/* Title: Who we are? */}
                    <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-8 text-center md:text-left">
                        Who <span className="font-playfair font-bold italic">we are?</span>
                    </h2>

                    <div className="space-y-8 font-lato text-lg text-gray-800 leading-relaxed text-left mb-24">
                        {/* P1 */}
                        <p>
                            Established in <span className="font-bold">2005</span>, Sealand Logistics group is a trusted provider of end-to-end freight forwarding and
                            integrated logistics solutions across <span className="font-bold">domestic and international markets</span>.
                        </p>

                        {/* P2 */}
                        <p>
                            Backed by a strong operational presence across India and a global partner network spanning <span className="font-bold">864+ cities
                                across 180+ countries</span>, we support efficient cargo movement across major trade lanes.
                        </p>

                        {/* P3 */}
                        <p>
                            Sealand Logistics offers a comprehensive portfolio of services, including <span className="font-bold">ocean freight, air freight,
                                domestic trucking, customs clearance, project cargo logistics, reefer and temperature-controlled
                                transportation, and cross-border logistics solutions</span>. Our expertise covers routine commercial shipments
                            as well as <span className="font-bold">oversized (OOG) project cargo, heavy lifts, perishables, time-critical consignments, and
                                specialized industry movements</span>.
                        </p>

                        {/* P3.5 - Reefer Operations */}
                        <p>
                            Sealand Logistics is <span className="font-bold">eastern India's leading reefer</span> trailer operators specializing in temperature-controlled EXIM logistics.
                        </p>

                        {/* P4 */}
                        <p>
                            Our <span className="font-bold">leadership and operations teams</span> bring together decades of hands-on experience in global logistics
                            and freight management—ensuring every shipment is planned, executed, and monitored with precision.
                        </p>
                    </div>

                    {/* Vision Section */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                        <div className="w-full md:w-1/2">
                            <img
                                src={VisionImg}
                                alt="Vision"
                                className="w-full h-auto rounded-3xl shadow-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-6 text-center md:text-left">
                                Vision
                            </h2>
                            <p className="font-lato text-lg text-gray-800 leading-relaxed">
                                To be a reliable global logistics partner, recognized for consistent operational performance,
                                responsible business practices, and integrated supply chain solutions that support sustainable
                                and resilient global trade.
                            </p>
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24">
                        <div className="w-full md:w-1/2">
                            <img
                                src={MissionImg}
                                alt="Mission"
                                className="w-full h-auto rounded-3xl shadow-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-6 text-center md:text-left">
                                Mission
                            </h2>
                            <p className="font-lato text-lg text-gray-800 leading-relaxed">
                                To deliver compliant, efficient, and high-quality logistics solutions by operating within
                                structured management systems, managing risk proactively, and continuously improving our
                                processes—while creating long-term value for customers, partners, employees, and the wider
                                supply chain ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* Leadership Section */}
                    <LeadershipSection />

                </div>
            </div>
        </div>
    );
};

export default AboutUs;
