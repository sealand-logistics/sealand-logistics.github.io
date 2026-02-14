import { Link } from 'react-router-dom';
import FooterBg from '../assets/Footer.png';
import LogoWhite from '../assets/sealand_logowhite.png';

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
            <div className="mb-6">
              <img src={LogoWhite} alt="Sealand Logistics" className="h-16 w-auto" />
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
                  OOG Projects
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
              <li>
                <Link to="/locations" className="hover:text-gray-100">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/stc" className="hover:text-gray-100">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">Services</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Ocean Freight</li>
              <li>Domestic Trucking (FTL) – Pan India</li>
              <li>OOG, Project Cargo, ODC, Break Bulk</li>
              <li>Reefer Export & Import Logistics</li>
              <li>India–Bangladesh land exports & imports</li>
              <li>Customs Clearance</li>
              <li>Port Trailer Transportation</li>
              <li>Air Freight</li>
              <li>Warehousing & Distribution</li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">
              Contact Details
            </h3>
            <ul className="space-y-6 text-sm text-gray-200">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FF6600]">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 3.58-3.14c.6-.67 1.157-1.318 1.636-1.928C19.225 15.228 21 12.11 21 9.45c0-5.135-4.067-9.3-9.102-9.45a.75.75 0 0 0-.102 0C6.767-.15 2.7 4.015 2.7 9.15c0 2.66 1.775 5.778 3.337 7.783.48.61 1.035 1.258 1.636 1.928a16.975 16.975 0 0 0 3.58 3.14ZM12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>9th Floor,Park NX, 43 Rafi Ahmed Kidwai Road, Kolkata -700016</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FF6600]">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span>corporate@sealandlogisticsgroup.com</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FF6600]">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.915l-1.007.755a.75.75 0 0 0-.15.98 11.235 11.235 0 0 0 4.96 4.96.75.75 0 0 0 .98-.15l.755-1.007a1.875 1.875 0 0 1 1.915-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>+91 8013330628 / +91 9830789141</span>
              </li>
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

