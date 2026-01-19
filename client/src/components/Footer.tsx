import { Link } from 'react-router-dom';
import FooterBg from '../assets/Footer.png';

const Footer = () => {
  return (
    <footer
      className="text-white pt-12 pb-6 mt-16"
      style={{
        backgroundImage: `url(${FooterBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#02043A',
      }}
    >
      <div className="w-full px-[15px] md:px-[60px]">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand + description */}
          <div>
            <div className="inline-block bg-white px-3 py-2 mb-4">
              <span className="block text-xs tracking-[0.25em] text-[#FF5A1F] font-bold">
                SEALAND
              </span>
              <span className="block text-[10px] tracking-[0.35em] text-[#02043A] font-semibold">
                LOGISTICS
              </span>
            </div>
            <p className="text-sm text-gray-200 max-w-xs">
              Your trusted partner for end-to-end global freight, transportation,
              and supply chain solutions across 180+ countries.
            </p>

            <div className="flex gap-4 mt-6 text-lg">
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#02043A] transition"
              >
                in
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#02043A] transition"
              >
                X
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#02043A] transition"
              >
                ⓘ
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#02043A] transition"
              >
                ◎
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link to="/" className="hover:text-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gray-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/specializations" className="hover:text-gray-100">
                  Specializations
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-100">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/oog-projects" className="hover:text-gray-100">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-gray-100">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-100">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">Services</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Ocean Freight</li>
              <li>Air Freight</li>
              <li>Domestic Trucking (FTL)</li>
              <li>Customs Clearance</li>
              <li>Port Trailer Transportation</li>
              <li>Warehousing &amp; Distribution</li>
              <li>Breakbulk / Heavy Cargo Handling</li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">
              Contact Details
            </h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li>Client Address Here</li>
              <li>info@sealandlogistics.net</li>
              <li>+91 [Number]</li>
              <li>+91 [Number]</li>
            </ul>
          </div>
        </div>

        <hr className="border-white/20 mt-10 mb-4" />

        <p className="text-center text-xs text-gray-300">
          © 2025 Sealand Logistics. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

