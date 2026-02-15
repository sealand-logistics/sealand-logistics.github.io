import SpecializationBG from '../assets/Specialization_BG.png';
import { specializationsData as staticSpecializations } from '../data/specializationsData';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://sealand-logistics-github-io.onrender.com/api';

const Specializations = () => {
  const [dynamicSpecializations, setDynamicSpecializations] = useState<any[]>([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/projects?category=Specialization`);
        if (res.data && res.data.length > 0) {
          setDynamicSpecializations(res.data);
        }
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };
    fetchSpecializations();
  }, []);

  const data = dynamicSpecializations.length > 0 ? dynamicSpecializations : staticSpecializations;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
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
          {data.map((item) => (
            <div
              key={item._id || item.id}
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
                <div
                  className="font-lato text-sm text-gray-700 mb-4 leading-relaxed line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                {item.points && item.points.length > 0 && (
                  <ul className="space-y-2">
                    {item.points.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#FF6600] mr-2 mt-1 flex-shrink-0">●</span>
                        <span className="font-lato text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specializations;
