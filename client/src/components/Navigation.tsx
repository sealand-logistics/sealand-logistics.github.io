import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/sealand_logo.png';

const Navigation = () => {
    const location = useLocation();
    const isTransparentPage = location.pathname === '/' || location.pathname === '/about-us' || location.pathname === '/services' || location.pathname === '/certifications' || location.pathname === '/industries' || location.pathname === '/clients' || location.pathname === '/contact' || location.pathname === '/oog-projects' || location.pathname === '/specializations';
    const [isScrolled, setIsScrolled] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Text color logic: White only if on Transparent Page AND not scrolled. Otherwise dark.
    const textColorClass = (isTransparentPage && !isScrolled) ? 'text-white' : 'text-gray-900';
    const buttonClass = (isTransparentPage && !isScrolled)
        ? 'bg-white text-[#000040] hover:bg-gray-100' // Initial: White BG, Dark Blue Text
        : 'bg-[#FF6600] text-white hover:bg-[#E65A00]'; // Scrolled: Orange BG, White Text

    const navLinks = [
        { name: 'About Us', path: '/about-us' },
        { name: 'Specializations', path: '/specializations' },
        { name: 'Services', path: '/services' },
        { name: 'OOG Projects', path: '/oog-projects' },
        { name: 'Industries', path: '/industries' },
        { name: 'Clients', path: '/clients' },
        { name: 'Certifications', path: '/certifications' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="w-full px-[15px] md:px-[60px] py-4 flex justify-between items-center relative z-50">
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} alt="Sealand Logistics" className="h-12" />
                </Link>

                {/* Nav Links - Desktop */}
                <div className="hidden lg:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-lato font-medium transition-colors duration-200 ${textColorClass} hover:text-[#000099] ${location.pathname === link.path ? 'text-[#000099]' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Get a Quote Button - Hidden on small mobile, visible from sm up */}
                    <Link
                        to="/contact"
                        className={`${buttonClass} hidden sm:block font-lato font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-sm text-sm`}
                    >
                        Get a quote
                    </Link>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`lg:hidden p-2 transition-colors duration-200 ${isMenuOpen || isScrolled ? 'text-gray-900' : textColorClass}`}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ top: '80px' }} // Adjust based on nav height
            >
                <div className="flex flex-col h-full p-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-xl font-lato font-semibold py-3 border-b border-gray-100 text-[#000040] hover:text-[#FF6600] transition-colors duration-200 ${location.pathname === link.path ? 'text-[#FF6600]' : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-4 bg-[#FF6600] text-white font-lato font-bold py-4 px-6 rounded-xl text-center shadow-lg hover:bg-[#E65A00] transition-colors duration-200"
                    >
                        Get a quote
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
