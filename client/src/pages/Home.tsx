import Hero from '../components/Hero';
import SpecializationsSection from '../components/SpecializationsSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import CertificationsSection from '../components/CertificationsSection';
import OOGSection from '../components/OOGSection';
import IndustrySection from '../components/IndustrySection';
import ClientsSection from '../components/ClientsSection';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <SpecializationsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <OOGSection />
      <CertificationsSection limit={true} />
      <IndustrySection />
      <ClientsSection limit={true} />
    </div>
  );
};

export default Home;
