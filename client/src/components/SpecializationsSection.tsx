import { Link } from 'react-router-dom';
import { specializationsData } from '../data/specializationsData';

const SpecializationsSection = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="w-full">
        <div className="mx-[15px] md:mx-[60px]">
          <h2 className="text-left text-[32px] md:text-5xl font-playfair font-bold text-[#000040] mb-10">
            Our <span className="font-playfair font-bold italic">Specializations</span>
          </h2>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {specializationsData.map((item) => (
              <Link
                key={item.id}
                to="/specializations"
                className="group bg-white rounded-3xl overflow-hidden transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover aspect-[16/10] transition-transform duration-300"
                  />
                  <button
                    type="button"
                    className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white transition group-hover:bg-[#FF6600] group-hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </button>
                </div>

                <div className="py-5 pr-6 pl-0">
                  <p className="font-lato text-base font-semibold text-gray-900 transition-colors">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
