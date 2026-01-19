import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Orange Icon using SVG
const orangeIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `
        <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 0C5.59645 0 0 5.59645 0 12.5C0 21.875 12.5 41 12.5 41C12.5 41 25 21.875 25 12.5C25 5.59645 19.4036 0 12.5 0ZM12.5 17C10.0147 17 8 14.9853 8 12.5C8 10.0147 10.0147 8 12.5 8C14.9853 8 17 10.0147 17 12.5C17 14.9853 14.9853 17 12.5 17Z" fill="#FF6600"/>
        </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

interface PortLocation {
    name: string;
    coords: [number, number];
    type: string;
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
            { name: 'Kolkata', coords: [22.5726, 88.3639], type: 'East Coast' },
            { name: 'Haldia', coords: [22.0645, 88.0772], type: 'East Coast' },
            { name: 'Paradeep', coords: [20.2706, 86.6664], type: 'East Coast' },
            { name: 'Visakhapatnam', coords: [17.6868, 83.2185], type: 'East Coast' },
            { name: 'Gangavaram', coords: [17.6253, 83.2427], type: 'East Coast' },
            { name: 'Chennai', coords: [13.0827, 80.2707], type: 'East Coast' },
            { name: 'Ennore', coords: [13.2505, 80.3344], type: 'East Coast' },
            { name: 'Tuticorin', coords: [8.7642, 78.1348], type: 'East Coast' },
            { name: 'Nhava Sheva', coords: [18.9497, 72.9482], type: 'West Coast' },
            { name: 'Mundra', coords: [22.8256, 69.7431], type: 'West Coast' },
            { name: 'ICD TKD, Delhi', coords: [28.5085, 77.2917], type: 'North Zone' },
        ]
    },
    'india-land': {
        name: 'Indian Land Ports',
        center: [25.0, 88.0],
        zoom: 6,
        locations: [
            { name: 'Petrapole – Benapole (Bangladesh)', coords: [23.1, 88.8], type: 'Land Port' },
            { name: 'Raxaul – Birgunj (Nepal)', coords: [26.98, 84.85], type: 'Land Port' },
            { name: 'Jaigaon – Phuntsholing (Bhutan)', coords: [26.85, 89.38], type: 'Land Port' },
        ]
    },
    'china': {
        name: 'China Port Services',
        center: [35.0, 115.0],
        zoom: 4,
        locations: [
            { name: 'Shanghai', coords: [31.2304, 121.4737], type: 'Port' },
            { name: 'Shenzhen', coords: [22.5431, 114.0579], type: 'Port' },
            { name: 'Ningbo', coords: [29.8683, 121.5440], type: 'Port' },
            { name: 'Qingdao', coords: [36.0671, 120.3826], type: 'Port' },
            { name: 'Guangzhou', coords: [23.1291, 113.2644], type: 'Port' },
            { name: 'Tianjin', coords: [39.0842, 117.2009], type: 'Port' },
            { name: 'Dalian', coords: [38.9140, 121.6147], type: 'Port' },
            { name: 'Xiamen', coords: [24.4798, 118.0894], type: 'Port' },
            { name: 'Zhuhai', coords: [22.2707, 113.5767], type: 'Port' },
            { name: 'Lianyungang', coords: [34.5966, 119.2227], type: 'Port' },
        ]
    },
    'global': {
        name: 'Global Network',
        center: [20.0, 0.0],
        zoom: 2,
        locations: [
            { name: 'South Korea', coords: [37.5665, 126.9780], type: 'Network Office' },
            { name: 'Japan', coords: [35.6762, 139.6503], type: 'Network Office' },
            { name: 'Taiwan', coords: [25.0330, 121.5654], type: 'Network Office' },
            { name: 'Russia', coords: [55.7558, 37.6173], type: 'Network Office' },
            { name: 'UK', coords: [51.5074, -0.1278], type: 'Network Office' },
            { name: 'US (New York)', coords: [40.7128, -74.0060], type: 'Network Office' },
            { name: 'Canada (Toronto)', coords: [43.6532, -79.3832], type: 'Network Office' },
            { name: 'Mexico', coords: [19.4326, -99.1332], type: 'Network Office' },
            { name: 'Kenya', coords: [-1.2921, 36.8219], type: 'Network Office' },
            { name: 'Australia (Sydney)', coords: [-33.8688, 151.2093], type: 'Network Office' },
            { name: 'Germany (EU)', coords: [52.5200, 13.4050], type: 'Network Office' },
            { name: 'Brazil (Latin America)', coords: [-23.5505, -46.6333], type: 'Network Office' },
        ]
    }
};

const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const PortMap = () => {
    const [activeRegion, setActiveRegion] = useState('india-sea');

    return (
        <div className="flex flex-col gap-6">
            {/* Region Switcher */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start">
                {Object.entries(regions).map(([key, region]) => (
                    <button
                        key={key}
                        onClick={() => setActiveRegion(key)}
                        className={`px-4 py-2 rounded-full font-lato font-bold text-sm transition-all duration-300 ${activeRegion === key
                                ? 'bg-[#FF6600] text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF6600] hover:text-[#FF6600]'
                            }`}
                    >
                        {region.name}
                    </button>
                ))}
            </div>

            {/* Map Container */}
            <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg z-0 relative">
                <MapContainer
                    center={regions[activeRegion].center}
                    zoom={regions[activeRegion].zoom}
                    className="h-full w-full"
                    scrollWheelZoom={false}
                >
                    <ChangeView center={regions[activeRegion].center} zoom={regions[activeRegion].zoom} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {regions[activeRegion].locations.map((loc, idx) => (
                        <Marker
                            key={`${activeRegion}-${idx}`}
                            position={loc.coords}
                            icon={orangeIcon}
                        >
                            <Popup>
                                <div className="p-1">
                                    <h4 className="font-playfair font-bold text-base text-[#000040] mb-1">{loc.name}</h4>
                                    <p className="font-lato text-xs text-gray-600 uppercase tracking-wider">{loc.type}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Global Note */}
            {activeRegion === 'global' && (
                <p className="text-gray-500 font-lato text-sm italic text-center lg:text-left">
                    * Global network spans 864 cities in 180 countries. Showing representative offices.
                </p>
            )}
        </div>
    );
};

export default PortMap;
