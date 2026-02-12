import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://sealand-logistics-github-io.onrender.com/api';

interface Certification {
    _id: string;
    name: string;
    image: string;
}

interface CertificationsSectionProps {
    limit?: boolean;
    showTitle?: boolean;
}

const CertificationsSection = ({ limit = false, showTitle = true }: CertificationsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dynamicCerts, setDynamicCerts] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/certifications`);
                setDynamicCerts(res.data);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();

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

    // Show only first 5 if limited, otherwise show all
    const certifications = limit ? dynamicCerts.slice(0, 5) : dynamicCerts;

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
                    {loading ? (
                        /* Loading Skeletons */
                        [1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="bg-white/50 p-6 rounded-xl border border-gray-100 w-40 h-28 animate-pulse" />
                        ))
                    ) : (
                        certifications.map((cert, index) => (
                            <div
                                key={cert._id}
                                className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-700 transform border border-gray-100 w-40 h-28 flex items-center justify-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <img
                                    src={cert.image}
                                    alt={cert.name}
                                    className="max-w-full max-h-full object-contain transition-all duration-300"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
