import { useEffect, useRef, useState } from 'react';
import Cert1 from '../assets/Certifications/1.png';
import Cert2 from '../assets/Certifications/2.png';
import Cert3 from '../assets/Certifications/3.png';
import Cert4 from '../assets/Certifications/4.png';
import Cert5 from '../assets/Certifications/5.png';
import Cert6 from '../assets/Certifications/6.png';
import Cert7 from '../assets/Certifications/7.png';
import Cert8 from '../assets/Certifications/8.png';
import Cert9 from '../assets/Certifications/9.png';
import Cert10 from '../assets/Certifications/10.png';

interface CertificationsSectionProps {
    limit?: boolean;
    showTitle?: boolean;
}

const CertificationsSection = ({ limit = false, showTitle = true }: CertificationsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const allCertifications = [
        { id: 1, src: Cert1, alt: 'Federal Maritime Commission' },
        { id: 2, src: Cert2, alt: 'ISO 9001:2015' },
        { id: 3, src: Cert3, alt: 'ISO 45001:2018' },
        { id: 4, src: Cert4, alt: 'MTO' },
        { id: 5, src: Cert5, alt: 'AEO Indian Customs' },
        { id: 6, src: Cert6, alt: 'Certification 6' },
        { id: 7, src: Cert7, alt: 'Certification 7' },
        { id: 8, src: Cert8, alt: 'Certification 8' },
        { id: 9, src: Cert9, alt: 'Certification 9' },
        { id: 10, src: Cert10, alt: 'Certification 10' },
    ];

    // Show only first 5 if limited, otherwise show all
    const certifications = limit ? allCertifications.slice(0, 5) : allCertifications;

    return (
        <section ref={sectionRef} className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {showTitle && (
                    <div
                        className={`text-center mb-12 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h2 className="text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-4 text-center">
                            Our <span className="font-playfair font-bold italic text-blue-900">Certifications</span>
                        </h2>
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {certifications.map((cert, index) => (
                        <div
                            key={cert.id}
                            className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-700 transform border border-gray-100 w-40 h-28 flex items-center justify-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <img
                                src={cert.src}
                                alt={cert.alt}
                                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
