import SpecializationBG from '../assets/Specialization_BG.png';

export const specializationsData = [
  {
    id: 1,
    title: 'OOG, Project Cargo, ODC, Break Bulk',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Advanced engineered logistics solutions for complex OOG, oversized, over-dimensional, project and break bulk cargo.',
    points: [
      'Specialized handling of OOG, break bulk, and project cargo',
      'Heavy-lift operations, crane deployment, and route engineering',
      'Feasibility studies, permits, and regulatory clearances',
      'Multi-modal execution across road, barge, sea and port operations',
      'Controlled, end-to-end project execution with on-ground coordination'
    ]
  },
  {
    id: 2,
    title: 'Reefer cargo export-import logistics',
    image: 'https://images.pexels.com/photos/3057960/pexels-photo-3057960.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Eastern India\'s leading reefer trailer operators specializing in temperature-controlled EXIM logistics.',
    points: [
      'Comprehensive refrigerated logistics planning and execution',
      'Safe handling of perishables, pharmaceuticals, food products, and sensitive cargo',
      'Compliance with international cold-chain standards and quality protocols',
      'Seamless coordination across ports, carriers, and inland transport networks',
      'End-to-end visibility with proactive risk and temperature management'
    ]
  },
  {
    id: 3,
    title: 'India–Bangladesh land export & imports',
    image: 'https://images.pexels.com/photos/6169669/pexels-photo-6169669.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Specialized cross-border logistics solutions for seamless India - Bangladesh land trade via Asia\'s busiest land port of Petrapole & Benapole.',
    points: [
      'Expertise in land-port operations, customs, and cross-border procedures',
      'Coordinated documentation and regulatory compliance support',
      'Reliable trucking with transit & transshipment cargo management',
      'Optimized processes to reduce border dwell time',
      'Secure, compliant movement of import and export consignments'
    ]
  },
];

const Specializations = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden bg-white">
        <div
          className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${SpecializationBG})`,
          }}
        >
          <h1 className="text-[32px] md:text-7xl font-playfair font-bold text-white italic drop-shadow-md text-center">
            Our Specializations
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-[15px] md:px-[60px] py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
          {specializationsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-[#000040] mb-3">
                  {item.title}
                </h3>
                <p className="font-lato text-sm text-gray-700 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#FF6600] mr-2 mt-1 flex-shrink-0">●</span>
                      <span className="font-lato text-sm text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specializations;
