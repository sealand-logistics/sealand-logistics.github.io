import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Specializations from './pages/Specializations';
import Services from './pages/Services';
import OOGProjects from './pages/OOGProjects';
import Industries from './pages/Industries';
import Clients from './pages/Clients';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import STC from './pages/STC';

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 font-lato relative flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/specializations" element={<Specializations />} />
            <Route path="/services" element={<Services />} />
            <Route path="/oog-projects" element={<OOGProjects />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/stc" element={<STC />} />
          </Routes>
        </main>
        <CTASection />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
