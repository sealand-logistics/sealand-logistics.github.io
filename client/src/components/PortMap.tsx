import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Dot Icon using SVG
const createDotIcon = (color: string, size: number = 16, isActive: boolean = false) => {
    return L.divIcon({
        className: 'custom-dot-icon',
        html: `
            <div style="position: relative; width: ${size}px; height: ${size}px;">
                ${isActive ? `
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${size * 3}px; height: ${size * 3}px; background: rgba(255, 102, 0, 0.25); border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${size * 2}px; height: ${size * 2}px; background: rgba(255, 102, 0, 0.15); border-radius: 50%;"></div>
                ` : ''}
                <div style="width: ${size}px; height: ${size}px; background: ${color}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative; z-index: 10;"></div>
            </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
};

const defaultOrangeIcon = createDotIcon('#FF6600', 16, false);
const activeOrangeIcon = createDotIcon('#FF6600', 18, true);

interface PortLocation {
    name: string;
    coords: [number, number];
    type: string;
    description?: string;
    route?: string[];
}

interface RegionData {
    name: string;
    center: [number, number];
    zoom: number;
    locations: PortLocation[];
}

const regions: Record<string, RegionData> = {
    'global': {
        name: 'Global Network',
        center: [20.0, 0.0],
        zoom: 2,
        locations: [
            { name: 'China Network', coords: [35.0, 105.0], type: 'Regional Hub', description: 'Comprehensive port services across 10 major Chinese maritime gateways.' },
            { name: 'SE Asia Hub', coords: [1.3521, 103.8198], type: 'Strategic Hub', description: 'Connectivity focal point for ASEAN trade corridors and transshipment.' },
            { name: 'UK & Europe', coords: [51.5074, -0.1278], type: 'Regional Hub', description: 'Advanced logistics coordination for EU and UK industrial sectors.' },
            { name: 'North America', coords: [40.7128, -74.0060], type: 'Regional Hub', description: 'Specialized cargo handling and project logistics across US and Canada.' },
            { name: 'South Korea', coords: [37.5665, 126.9780], type: 'Network Office', description: 'Far East operations serving high-tech and industrial manufacturing.' },
            { name: 'Japan', coords: [35.6762, 139.6503], type: 'Network Office', description: 'Strategic logistics support for Japan\'s global trade networks.' },
            { name: 'Latin America', coords: [19.4326, -99.1332], type: 'Strategic Hub', description: 'Emerging gateway for Mexico and Latin American market sectors.' },
            { name: 'East Africa', coords: [-1.2921, 36.8219], type: 'Network Office', description: 'Serving the growing logistics needs of Kenya, Tanzania, and Ethiopia.' },
            { name: 'Australia & NZ', coords: [-33.8688, 151.2093], type: 'Strategic Hub', description: 'Regional logistics hub for Oceania trade lanes.' },
        ]
    },
    'india-sea': {
        name: 'Indian Sea Ports',
        center: [20.5937, 78.9629],
        zoom: 5,
        locations: [
            { name: 'Kolkata', coords: [22.5726, 88.3639], type: 'East Coast Port', description: 'Primary gateway for Eastern India and neighboring landlocked countries.', route: ['Kolkata, India', 'International Transshipment'] },
            { name: 'Haldia', coords: [22.0645, 88.0772], type: 'East Coast Port', description: 'Modern industrial complex handling bulk, liquid, and project cargo.' },
            { name: 'Nhava Sheva', coords: [18.9497, 72.9482], type: 'West Coast Port', description: 'India\'s largest container gateway, handling over 50% of the country\'s total throughput.' },
            { name: 'Mundra', coords: [22.8256, 69.7431], type: 'West Coast Port', description: 'Largest private port in India with state-of-the-art terminal facilities.' },
            { name: 'Visakhapatnam', coords: [17.6868, 83.2185], type: 'East Coast Port', description: 'Diversified port with specialized terminals for iron ore and minerals.' },
            { name: 'Chennai', coords: [13.0827, 80.2707], type: 'East Coast Port', description: 'Major maritime hub for automotive and engineering exports.' },
            { name: 'Tuticorin', coords: [8.7642, 78.1348], type: 'South Zone Port', description: 'Strategically located for coastal and SE Asian maritime trade.' },
        ]
    },
    'india-land': {
        name: 'Indian Land Ports',
        center: [25.0, 88.0],
        zoom: 6,
        locations: [
            { name: 'Petrapole – Benapole', coords: [23.1, 88.8], type: 'Land Port (Bangladesh)', description: 'Crucial cross-border trade link between India and Bangladesh.' },
            { name: 'Raxaul – Birgunj', coords: [26.98, 84.85], type: 'Land Port (Nepal)', description: 'Primary trading gateway serving Nepal\'s international cargo needs.' },
            { name: 'Jaigaon – Phuntsholing', coords: [26.85, 89.38], type: 'Land Port (Bhutan)', description: 'The main economic artery connecting the Kingdom of Bhutan with India.' },
        ]
    },
    'china': {
        name: 'China Port Services',
        center: [35.0, 115.0],
        zoom: 4,
        locations: [
            { name: 'Shanghai', coords: [31.2304, 121.4737], type: 'Primary Port', description: 'The world\'s busiest container port and a global logistics powerhouse.' },
            { name: 'Ningbo-Zhoushan', coords: [29.8683, 121.5440], type: 'Deepwater Port', description: 'World-class maritime hub serving the Yangtze River Delta.' },
            { name: 'Shenzhen', coords: [22.5431, 114.0579], type: 'South China Gateway', description: 'Strategic hub for manufacturing exports from the Pearl River Delta.' },
            { name: 'Qingdao', coords: [36.0671, 120.3826], type: 'Northern Gateway', description: 'Major port for heavy industry and mineral imports in North China.' },
            { name: 'Guangzhou', coords: [23.1291, 113.2644], type: 'River-Sea Port', description: 'Historic trade hub connecting inland China to global maritime routes.' },
        ]
    }
};

const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true, duration: 2 });
    }, [center, zoom, map]);
    return null;
};

const PortMap = () => {
    const [activeRegion, setActiveRegion] = useState('global');
    const [selectedLocation, setSelectedLocation] = useState<PortLocation | null>(null);

    return (
        <div className="relative w-full h-[600px] md:h-[650px] rounded-3xl overflow-hidden border border-gray-100 group z-0">
            {/* Map Container */}
            <MapContainer
                center={regions[activeRegion].center}
                zoom={regions[activeRegion].zoom}
                className="h-full w-full grayscale-0 contrast-[1.05] brightness-[1.02]"
                zoomControl={false}
                scrollWheelZoom={false}
            >
                <ChangeView center={regions[activeRegion].center} zoom={regions[activeRegion].zoom} />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    className="map-tiles"
                />

                {regions[activeRegion].locations.map((loc, idx) => (
                    <Marker
                        key={`${activeRegion}-${idx}`}
                        position={loc.coords}
                        icon={selectedLocation?.name === loc.name ? activeOrangeIcon : defaultOrangeIcon}
                        eventHandlers={{
                            click: () => setSelectedLocation(loc),
                        }}
                    />
                ))}
            </MapContainer>

            {/* In-Map Region Selector */}
            <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/50 flex flex-col gap-1.5">
                    {Object.entries(regions).map(([key, region]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveRegion(key);
                                setSelectedLocation(null);
                            }}
                            className={`px-5 py-3 rounded-xl font-lato font-bold text-xs transition-all duration-300 text-left min-w-[160px] ${activeRegion === key
                                ? 'bg-[#FF6600] text-white shadow-lg translate-x-1'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#000040]'
                                }`}
                        >
                            {region.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Floating Info Panel */}
            {selectedLocation && (
                <div className="absolute top-6 right-6 bottom-6 w-[320px] md:w-[360px] z-[1000] animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="bg-white/98 backdrop-blur-md h-full rounded-3xl shadow-2xl border border-white/50 p-8 flex flex-col pointer-events-auto overflow-y-auto">
                        <button
                            onClick={() => setSelectedLocation(null)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-[#FF6600] transition-colors p-2"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="mt-6">
                            <h3 className="text-[#FF6600] font-playfair font-bold text-3xl md:text-4xl leading-tight">
                                {selectedLocation.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-3">
                                <div className="w-2 h-2 rounded-full bg-[#FF6600]"></div>
                                <p className="font-lato text-gray-500 text-sm font-bold uppercase tracking-wider">
                                    {selectedLocation.type}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 space-y-8 flex-grow">
                            <div>
                                <h4 className="font-lato text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-3">Service Focus</h4>
                                <p className="text-[#000040] font-lato text-sm leading-relaxed font-medium">
                                    {selectedLocation.description || 'Global multimodal connections serving the world\'s most specialized industry sectors with precision logistics.'}
                                </p>
                            </div>

                            {selectedLocation.route && (
                                <div>
                                    <h4 className="font-lato text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">Logistics Corridor</h4>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2 h-2 rounded-sm border-2 border-[#FF6600] rotate-45 shrink-0"></div>
                                            <span className="text-[#000040] font-lato font-bold text-sm">{selectedLocation.route[0]}</span>
                                        </div>
                                        <div className="flex items-center pl-1">
                                            <div className="w-px h-6 bg-gray-200 ml-[3px]"></div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-2 h-2 rounded-sm border-2 border-gray-300 rotate-45 shrink-0"></div>
                                            <span className="text-gray-500 font-lato font-bold text-sm italic">{selectedLocation.route[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-lato text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Visibility</h4>
                                <p className="text-[#000040] font-lato font-bold text-[10px] uppercase">Full Live Tracking</p>
                            </div>
                            <div>
                                <h4 className="font-lato text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Type</h4>
                                <p className="text-[#000040] font-lato font-bold text-[10px] uppercase">Direct Service</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pulse Animation Style */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
                    100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; }
                }
                .leaflet-container {
                    background-color: #f8f9fa !important;
                }
                .leaflet-tile-container {
                    filter: grayscale(1) invert(0.05) contrast(0.9);
                    opacity: 0.8 !important;
                }
            `}} />
        </div>
    );
};

export default PortMap;
