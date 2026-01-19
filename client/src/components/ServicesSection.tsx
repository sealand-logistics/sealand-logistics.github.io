import ServicesBg from '../assets/ServiceBG.png';
import { servicesData } from '../pages/Services';

const ServicesSection = () => {
  return (
    <section
      className="w-full py-16 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 64, 0.85), rgba(0, 0, 139, 0.75)), url(${ServicesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full">
        <h2 className="text-center text-[32px] font-playfair font-bold !text-white mb-12">
          Our <span className="italic font-playfair font-bold">Services</span>
        </h2>

        <div className="mx-[15px] md:mx-[60px] grid gap-8 grid-cols-1 md:grid-cols-3">
          {servicesData.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6"
            >
              <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center mb-4">
                <img src={s.icon} alt="" className="h-8 w-8" />
              </div>
              <h3 className="font-lato font-bold text-lg mb-2">{s.title}</h3>
              <p className="font-lato text-sm text-white/80 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

