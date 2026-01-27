import OceanFreightIcon from '../assets/Icons/OceanFreight.png';
import AirFreightIcon from '../assets/Icons/AirFrieght.png';
import DomesticTruckingIcon from '../assets/Icons/DomesticTrucking.png';
import CustomsClearanceIcon from '../assets/Icons/CustomClearance.png';
import OOGIcon from '../assets/Icons/OOG.png';
import ReeferIcon from '../assets/Icons/Reefer.png';
import IndiaBangladeshIcon from '../assets/Icons/IndiaBangladesh.png';
import PortTrailerIcon from '../assets/Icons/PortTrailer.png';
import WarehousingIcon from '../assets/Icons/Wearhousing.png';
import ServicesSection from '../components/ServicesSection';
import ServicesBG from '../assets/ServicesBG.png';

export const servicesData = [
  {
    id: 1,
    title: 'Ocean Freight',
    description:
      'End-to-end ocean freight solutions delivering reliable, flexible, and cost-efficient global cargo movement.',
    icon: OceanFreightIcon,
  },
  {
    id: 2,
    title: 'Domestic Trucking (FTL) – Pan India',
    description:
      'Reliable full-truckload transportation across key industrial and commercial corridors throughout India.',
    icon: DomesticTruckingIcon,
  },
  {
    id: 3,
    title: 'OOG, Project Cargo, ODC, Break Bulk',
    description:
      'Advanced engineered logistics solutions for complex OOG, over sized, over-dimensional, project and break bulk cargo.',
    icon: OOGIcon,
  },
  {
    id: 4,
    title: 'Reefer Export & Import Logistics',
    description:
      'Eastern India’s leading reefer trailer operators specializing in temperature-controlled EXIM logistics.',
    icon: ReeferIcon,
  },
  {
    id: 5,
    title: 'India–Bangladesh land exports & imports',
    description:
      'Specialized cross-border logistics solutions for seamless India - Bangladesh land trade via Asia’s busiest land port of Petrapole & Benapole.',
    icon: IndiaBangladeshIcon,
  },
  {
    id: 6,
    title: 'Customs Clearance',
    description:
      'Comprehensive customs clearance solutions ensuring smooth, compliant, and timely cargo movement.',
    icon: CustomsClearanceIcon,
  },
  {
    id: 7,
    title: 'Port Trailer Transportation',
    description:
      'Efficient port-centric transportation connecting ports, ICDs, CFSs, and terminals seamlessly.',
    icon: PortTrailerIcon,
  },
  {
    id: 8,
    title: 'Air Freight',
    description:
      'Time-critical and flexible air freight solutions designed for fast-moving and high-value supply chains.',
    icon: AirFreightIcon,
  },
  {
    id: 9,
    title: 'Warehousing & Distribution',
    description:
      'Integrated warehousing, 3PL, and distribution solutions supporting agile, and resilient supply chains.',
    icon: WarehousingIcon,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
        <div
          className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 64, 0.7), rgba(0, 0, 139, 0.5)), url(${ServicesBG})`,
          }}
        >
          <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
            Our Services
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-8 text-center md:text-left">
            Logistics That Moves <span className="font-playfair font-bold italic">More Than Cargo</span>
          </h2>
          <p className="font-lato text-lg text-gray-800 leading-relaxed text-left mb-16">
            At Sealand Logistics, we enable global trade through reliable execution and integrated logistics solutions.
            Combining global reach with strong local expertise, we deliver process-driven, compliant, and seamless
            cargo movement across domestic and international markets. From ocean and air freight to inland
            transport, customs clearance, and project cargo, we provide end-to-end visibility and consistent,
            customer-focused execution at every stage of the supply chain.
          </p>
        </div>
      </div>

      {/* Existing Grid Section */}
      <ServicesSection />
    </div>
  );
};

export default Services;
