import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Hexagon SVG Icons
const createHexIcon = (color: string, size: number = 24, isActive: boolean = false) => {
    return L.divIcon({
        className: 'custom-hex-icon',
        html: `
            <div style="position: relative; width: ${size}px; height: ${size}px;">
                ${isActive ? `
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${size * 2.5}px; height: ${size * 2.5}px; background: rgba(255, 102, 0, 0.15); border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${size * 1.8}px; height: ${size * 1.8}px; background: rgba(255, 102, 0, 0.1); clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);"></div>
                ` : ''}
                <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: relative; z-index: 10;">
                    <path d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" fill="${color}" fill-opacity="${isActive ? '1' : '0.6'}"/>
                </svg>
            </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
};

const greyIcon = createHexIcon('#4A4A4A', 16);
const orangeIcon = createHexIcon('#FF6600', 20, true);

interface PortLocation {
    name: string;
    coords: [number, number];
    type: string;
    details?: string;
    route?: string[];
}

interface RegionData {
    name: string;
    center: [number, number];
    zoom: number;
    locations: PortLocation[];
}

const regions: Record<string, RegionData> = {
    'india-sea': {
        name: 'Indian Sea Ports',
        center: [20.5937, 78.9629],
        zoom: 5,
        locations: [
            { name: 'Kolkata', coords: [22.5726, 88.3639], type: 'East Coast', details: 'Primary gateway for Eastern India and neighboring landlocked countries.', route: ['Kolkata, India', 'Global Network'] },
            { name: 'Haldia', coords: [22.0645, 88.0772], type: 'East Coast', details: 'Major industrial port handling bulk, liquid, and containerized cargo.', route: ['Haldia, India', 'SE Asian Hubs'] },
            { name: 'Paradeep', coords: [20.2706, 86.6664], type: 'East Coast', details: 'Deepwater port specializing in iron ore and coal handling.' },
            { name: 'Visakhapatnam', coords: [17.6868, 83.2185], type: 'East Coast', details: 'One of the largest ports on the East Coast with advanced terminal facilities.' },
            { name: 'Gangavaram', coords: [17.6253, 83.2427], type: 'East Coast', details: 'Private deep-water port with modern infrastructure for heavy cargo.' },
            { name: 'Chennai', coords: [13.0827, 80.2707], type: 'East Coast', details: 'Major hub for automotive and engineering cargo in South India.' },
            { name: 'Ennore', coords: [13.2505, 80.3344], type: 'East Coast', details: 'Energy and bulk cargo focused port near Chennai.' },
            { name: 'Tuticorin', coords: [8.7642, 78.1348], type: 'East Coast', details: 'Strategically located for South Indian and coastal trade routes.' },
            { name: 'Nhava Sheva', coords: [18.9497, 72.9482], type: 'West Coast', details: 'India\'s largest container port, handling over 50% of the country\'s throughput.' },
            { name: 'Mundra', coords: [22.8256, 69.7431], type: 'West Coast', details: 'Largest private port in India with state-of-the-art logistics infrastructure.' },
            { name: 'ICD TKD, Delhi', coords: [28.5085, 77.2917], type: 'North Zone', details: 'Largest Inland Container Depot in India, serving the NCR region.' },
        ]
    },
    'india-land': {
        name: 'Indian Land Ports',
        center: [25.0, 88.0],
        zoom: 6,
        locations: [
            { name: 'Petrapole – Benapole', coords: [23.1, 88.8], type: 'Land Port (Bangladesh)', details: 'Largest land border crossing between India and Bangladesh.' },
            { name: 'Raxaul – Birgunj', coords: [26.98, 84.85], type: 'Land Port (Nepal)', details: 'Critical life-line for Nepal\'s international trade via India.' },
            { name: 'Jaigaon – Phuntsholing', coords: [26.85, 89.38], type: 'Land Port (Bhutan)', details: 'Primary gateway for trade between India and the Kingdom of Bhutan.' },
        ]
    },
    'china': {
        name: 'China Port Services',
        center: [35.0, 115.0],
        zoom: 4,
        locations: [
            { name: 'Shanghai', coords: [31.2304, 121.4737], type: 'Port', details: 'The world\'s busiest container port and global financial hub.' },
            { name: 'Shenzhen', coords: [22.5431, 114.0579], type: 'Port', details: 'Southern gateway to China\'s manufacturing heartland.' },
            { name: 'Ningbo-Zhoushan', coords: [29.8683, 121.5440], type: 'Port', details: 'World-class deep-water port with massive handling capacity.' },
            { name: 'Qingdao', coords: [36.0671, 120.3826], type: 'Port', details: 'Major logistics hub for Northern China and the Yellow Sea.' },
            { name: 'Guangzhou', coords: [23.1291, 113.2644], type: 'Port', details: 'Key inland port serving the Pearl River Delta economy.' },
        ]
    },
    'global': {
        name: 'Global Network',
        center: [20.0, 0.0],
        zoom: 2,
        locations: [
            { name: 'UK Network', coords: [51.5074, -0.1278], type: 'Network Office', details: 'European coordination hub for sea and air freight operations.' },
            { name: 'US Logistics', coords: [40.7128, -74.0060], type: 'Network Office', details: 'North American operations center for project and special cargo.' },
            { name: 'ASEAN Hub', coords: [1.3521, 103.8198], type: 'Network Office', details: 'Strategic coordination point for South East Asian logistics corridors.' },
            { name: 'South Korea', coords: [37.5665, 126.9780], type: 'Network Office', details: 'Far East operations serving specialized industry sectors.' },
        ]
    }
};

const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true, duration: 1.5 });
    }, [center, zoom, map]);
    return null;
};

const PortMap = () => {
    const [activeRegion, setActiveRegion] = useState('india-sea');
    const [selectedLocation, setSelectedLocation] = useState<PortLocation | null>(null);

    // Filter locations to match the user's provided list precisely
    const activeLocations = regions[activeRegion].locations;

    return (
        <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden border border-gray-100 shadow-2xl group z-0">
            {/* Map Background */}
            <MapContainer
                center={regions[activeRegion].center}
                zoom={regions[activeRegion].zoom}
                className="h-full w-full grayscale-[0.8] contrast-[1.1] brightness-[1.05]"
                zoomControl={false}
                scrollWheelZoom={false}
            >
                <ChangeView center={regions[activeRegion].center} zoom={regions[activeRegion].zoom} />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {activeLocations.map((loc, idx) => (
                    <Marker
                        key={`${activeRegion}-${idx}`}
                        position={loc.coords}
                        icon={selectedLocation?.name === loc.name ? orangeIcon : greyIcon}
                        eventHandlers={{
                            click: () => setSelectedLocation(loc),
                        }}
                    />
                ))}
            </MapContainer>

            {/* In-Map Region Selector */}
            <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-white/50 flex flex-col gap-1">
                    {Object.entries(regions).map(([key, region]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveRegion(key);
                                setSelectedLocation(null);
                            }}
                            className={`px-4 py-2.5 rounded-xl font-lato font-bold text-xs transition-all duration-300 text-left ${activeRegion === key
                                    ? 'bg-[#FF6600] text-white shadow-lg scale-[1.02]'
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
                <div className="absolute top-6 right-6 bottom-6 w-[320px] md:w-[380px] z-[1000] animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="bg-white/95 backdrop-blur-md h-full rounded-3xl shadow-2xl border border-white/50 p-8 flex flex-col pointer-events-auto overflow-y-auto">
                        <button
                            onClick={() => setSelectedLocation(null)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="mt-4">
                            <h3 className="text-[#FF6600] font-playfair font-bold text-2xl md:text-3xl leading-tight">
                                {selectedLocation.name}
                            </h3>
                            <p className="font-lato text-gray-500 text-sm mt-2 font-medium tracking-wide uppercase">
                                {selectedLocation.type}
                            </p>
                        </div>

                        <div className="mt-10 space-y-8">
                            <div>
                                <h4 className="font-lato text-[10px] items-center text-gray-400 font-bold uppercase tracking-[0.2em] mb-3">Description</h4>
                                <p className="text-gray-600 font-lato text-sm leading-relaxed">
                                    {selectedLocation.details || 'Advanced logistics operations and strategic multimodal connections serving our global client base.'}
                                </p>
                            </div>

                            {selectedLocation.route && (
                                <div>
                                    <h4 className="font-lato text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-3">Major Route</h4>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0"></div>
                                            <span className="text-[#000040] font-lato font-bold text-sm tracking-tight">{selectedLocation.route[0]}</span>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                                            <span className="text-[#000040] font-lato font-bold text-sm tracking-tight">{selectedLocation.route[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-10 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-lato text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Status</h4>
                                    <p className="text-[#000040] font-lato font-bold text-sm">Operational</p>
                                </div>
                                <div>
                                    <h4 className="font-lato text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Type</h4>
                                    <p className="text-[#000040] font-lato font-bold text-sm">Direct Service</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pulse Animation Style */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.8; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; }
                    100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.8; }
                }
                .leaflet-container {
                    background-color: #f8f9fa !important;
                }
            `}} />
        </div>
    );
};

export default PortMap;
