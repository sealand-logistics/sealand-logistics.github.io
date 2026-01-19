import ManImg from '../assets/Man.png';

const teamMembers = [
    {
        name: 'Saswata Mitra',
        role: 'Managing Director',
        email: 'saswata@sealandlogisticsgroup.com',
    },
    {
        name: 'Varghese John',
        role: 'Director – Finance & compliance',
        email: 'john@sealandlogisticsgroup.com',
    },
    {
        name: 'Biswajit B Roy',
        role: 'Director – Ocean Freight, global OOG projects & Overseas Networks',
        email: 'biswajit@sealandlogisticsgroup.com',
    },
    {
        name: 'K. B. Khan',
        role: 'Director – India Bangladesh Cross-Border Business & Documentation',
        email: 'khan@sealandlogisticsgroup.com',
    },
    {
        name: 'Shyam sundar Das',
        role: 'Director – FTL Domestic Transportation & OOG projects trucking',
        email: 'shyam@sealandlogisticsgroup.com',
    },
];

const LeadershipSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-16 text-center">
                    Leadership <span className="font-playfair font-bold italic">Team</span>
                </h2>

                <div className="max-w-7xl mx-auto">
                    {/* Top Row: 3 Members */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 px-4 md:px-0">
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <div className="w-full h-72 mb-6 relative overflow-hidden bg-gray-50 rounded-lg transition-transform duration-500">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={ManImg}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-lato font-bold text-xl text-[#000040] mb-1">{member.name}</h3>
                                <p className="font-lato text-xs text-[#FF6600] font-bold uppercase tracking-widest mb-4 min-h-[2.5rem] flex items-center justify-center">
                                    {member.role}
                                </p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="font-lato text-sm text-gray-400 hover:text-[#FF6600] transition-colors border-t border-gray-100 pt-4 w-full"
                                >
                                    {member.email}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row: 2 Members */}
                    <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-4 md:px-0">
                        {teamMembers.slice(3).map((member, index) => (
                            <div key={index} className="w-full md:w-[calc(33.333%-1.33rem)] bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <div className="w-full h-72 mb-6 relative overflow-hidden bg-gray-50 rounded-lg transition-transform duration-500">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={ManImg}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-lato font-bold text-xl text-[#000040] mb-1">{member.name}</h3>
                                <p className="font-lato text-xs text-[#FF6600] font-bold uppercase tracking-widest mb-4 min-h-[2.5rem] flex items-center justify-center">
                                    {member.role}
                                </p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="font-lato text-sm text-gray-400 hover:text-[#FF6600] transition-colors border-t border-gray-100 pt-4 w-full"
                                >
                                    {member.email}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;
