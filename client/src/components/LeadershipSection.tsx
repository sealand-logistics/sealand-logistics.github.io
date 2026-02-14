import { useEffect, useState } from 'react';
import SaswataImg from '../assets/Team/Saswata.jpeg';
import VargheseImg from '../assets/Team/Vargesh.jpeg';
import BiswajitImg from '../assets/Team/Biswajit.jpeg';
import KhanImg from '../assets/Team/Khan.jpeg';
import ShyamImg from '../assets/Team/Shyam.jpeg';

const teamMembers = [
    {
        name: 'Saswata Mitra',
        role: 'Managing Director',
        email: 'saswata@sealandlogisticsgroup.com',
        image: SaswataImg
    },
    {
        name: 'Varghese John',
        role: 'Director\nFinance & Compliance',
        email: 'john@sealandlogisticsgroup.com',
        image: VargheseImg
    },
    {
        name: 'Biswajit B Roy',
        role: 'Director\nInternational business\nGlobal OOG Project Case Studies & Overseas Networks',
        email: 'biswajit@sealandlogisticsgroup.com',
        image: BiswajitImg
    },
    {
        name: 'K. B. Khan',
        role: 'Director\nIndia – Bangladesh business & Documentation',
        email: 'khan@sealandlogisticsgroup.com',
        image: KhanImg
    },
    {
        name: 'Shyam sundar Das',
        role: 'Director\nDomestic Transportation\nFTL & OOG / ODC Projects trucking',
        email: 'shyam@sealandlogisticsgroup.com',
        image: ShyamImg
    },
];

const LeadershipSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className={`text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-16 text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Leadership <span className="font-playfair font-bold italic">Team</span>
                </h2>

                <div className="max-w-7xl mx-auto">
                    {/* Top Row: 3 Members */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 px-4 md:px-0">
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <div
                                key={index}
                                className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-3 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="w-full h-96 mb-6 relative overflow-hidden bg-gray-50 rounded-lg">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-lato font-bold text-xl text-[#000040] mb-1">{member.name}</h3>
                                <div className="font-lato text-xs text-[#FF6600] font-bold uppercase tracking-widest mb-4 min-h-[3rem] flex items-center justify-center text-center leading-relaxed">
                                    <span>
                                        {member.role.split('\n').map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                {i < member.role.split('\n').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </span>
                                </div>
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
                            <div
                                key={index}
                                className={`w-full md:w-[calc(33.333%-1.33rem)] bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-3 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                                style={{ transitionDelay: `${(index + 3) * 150}ms` }}
                            >
                                <div className="w-full h-96 mb-6 relative overflow-hidden bg-gray-50 rounded-lg">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-lato font-bold text-xl text-[#000040] mb-1">{member.name}</h3>
                                <div className="font-lato text-xs text-[#FF6600] font-bold uppercase tracking-widest mb-4 min-h-[3rem] flex items-center justify-center text-center leading-relaxed">
                                    <span>
                                        {member.role.split('\n').map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                {i < member.role.split('\n').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </span>
                                </div>
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
