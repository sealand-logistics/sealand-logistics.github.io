import CelebrationImg from '../assets/Celebration20Years.png';

const cards = [
  {
    id: 1,
    title: '20+ Years of Excellence in Global Logistics',
    text: 'Established in 2005, Sealand Logistics Group leverages over two decades of industry expertise to deliver dependable, execution-focused logistics solutions worldwide.',
  },
  {
    id: 2,
    title:
      'Operations Across All Major Indian Ports, Industrial Zones & Logistics Hubs',
    text: 'With a strong on-ground presence across India’s key cities, ports, industrial zones, and logistics hubs, we deliver seamless ocean, inland, and port-centric operations—supported by experienced teams and a reliable network.',
  },
  {
    id: 3,
    title: 'Global Network in 864+ Cities, 180+ Countries',
    text: 'Powered by a strong global partner network, we facilitate efficient cross-border cargo movement across key trade lanes with optimized routing, reliable service standards, and full shipment visibility.',
  },
  {
    id: 4,
    title: 'Trusted by 500+ Customers Worldwide',
    text: 'Serving SMEs to Fortune 500 organizations & MNCs we are trusted for our transparency, execution discipline, and dependable on-time performance across every shipment.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="w-full px-[15px] md:px-[60px] flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <h2 className="text-[32px] md:text-4xl font-playfair font-bold text-[#000040] mb-10 text-center lg:text-left">
            <span className="font-playfair font-bold italic text-[#000040]">Why Choose</span>{' '}
            <span>Sealand Logistics?</span>
          </h2>
          <img
            src={CelebrationImg}
            alt="Celebrating 20 years"
            className="max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group flex gap-4 rounded-2xl bg-white shadow-md border border-gray-100 px-6 py-5 transition-colors duration-300 hover:bg-[#ff7a1a] hover:text-white"
            >
              <div className="mt-1 h-9 w-9 flex shrink-0 items-center justify-center rounded-full bg-[#ff7a1a] text-white text-xl font-semibold transition-colors duration-300 group-hover:bg-white group-hover:text-[#ff7a1a]">
                <span>★</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-lato font-bold text-sm md:text-base">
                  {card.title}
                </h3>
                <p className="font-lato text-xs md:text-sm text-gray-600 group-hover:text-white">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

