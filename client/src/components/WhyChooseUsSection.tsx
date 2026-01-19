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
              className="group flex flex-col gap-4 rounded-2xl bg-white shadow-md border border-gray-100 px-6 py-5 transition-colors duration-300 hover:bg-[#ff7a1a] hover:text-white"
            >
              <div className="flex items-center gap-2">
                <div className="flex shrink-0 items-center justify-center text-[#ff7a1a] transition-colors duration-300 group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-lato font-bold text-lg md:text-base">
                  {card.title}
                </h3>
              </div>
              <p className="font-lato text-xs md:text-sm text-gray-600 group-hover:text-white">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

