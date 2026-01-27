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
    state?: string;
}

const stateViews: Record<string, { center: [number, number], zoom: number }> = {
    'Delhi NCR': { center: [28.6139, 77.2090], zoom: 9 },
    'Haryana': { center: [29.0588, 76.0856], zoom: 8 },
    'Rajasthan': { center: [27.0238, 74.2179], zoom: 7 },
    'Uttar Pradesh': { center: [26.8467, 80.9462], zoom: 7 },
    'Uttarakhand': { center: [30.0668, 79.0193], zoom: 8 },
    'Himachal Pradesh': { center: [31.1048, 77.1734], zoom: 8 },
    'Gujarat': { center: [22.2587, 71.1924], zoom: 7 },
    'Maharashtra': { center: [19.7507, 75.7139], zoom: 7 },
    'Madhya Pradesh': { center: [22.9734, 78.6569], zoom: 7 },
    'Chhattisgarh': { center: [21.2787, 81.8661], zoom: 7 },
    'West Bengal': { center: [22.9868, 87.8550], zoom: 7 },
    'Odisha': { center: [20.9517, 85.0985], zoom: 7 },
    'Jharkhand': { center: [23.6102, 85.2799], zoom: 7 },
    'Bihar': { center: [25.0961, 85.3131], zoom: 7 },
    'Assam': { center: [26.2006, 92.9376], zoom: 7 },
    'Tamil Nadu': { center: [11.1271, 78.6569], zoom: 7 },
    'Karnataka': { center: [15.3173, 75.7139], zoom: 7 },
    'Telangana': { center: [17.1231, 79.2088], zoom: 7 },
    'Andhra Pradesh': { center: [15.9129, 79.7400], zoom: 7 },
};

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
            { name: 'United States', coords: [40.7128, -74.0060], type: 'Regional Hub', description: 'Specialized cargo handling and project logistics across major US gateways.' },
            { name: 'China', coords: [31.2304, 121.4737], type: 'Regional Hub', description: 'Connectivity focal point for China\'s massive maritime trade network.' },
            { name: 'United Arab Emirates', coords: [25.2769, 55.2962], type: 'Strategic Hub', description: 'Major transshipment hub connecting East and West trade lanes.' },
            { name: 'Russia', coords: [59.9311, 30.3609], type: 'Network Office', description: 'Baltic and Far East logistics operations serving the Eurasian corridor.' },
            { name: 'Saudi Arabia', coords: [21.4858, 39.1925], type: 'Regional Hub', description: 'Key maritime gateway for the Red Sea and Arabian Peninsula.' },
            { name: 'Singapore', coords: [1.3521, 103.8198], type: 'Strategic Hub', description: 'World-class transshipment hub and focal point for ASEAN trade.' },
            { name: 'Indonesia', coords: [-6.2088, 106.8456], type: 'Network Office', description: 'Serving the maritime logistics needs of the Indonesian archipelago.' },
            { name: 'Hong Kong', coords: [22.3193, 114.1694], type: 'Strategic Hub', description: 'Vital gateway and financial hub for South China and international trade.' },
            { name: 'South Korea', coords: [37.5665, 126.9780], type: 'Network Office', description: 'Far East operations serving high-tech and industrial manufacturing.' },
            { name: 'Netherlands', coords: [51.9225, 4.4791], type: 'Regional Hub', description: 'Gateway to Europe via Rotterdam, the continent\'s largest port.' },
            { name: 'Germany', coords: [53.5511, 9.9937], type: 'Regional Hub', description: 'Central European logistics hub serving global industrial sectors.' },
            { name: 'Australia', coords: [-33.8688, 151.2093], type: 'Strategic Hub', description: 'Regional logistics hub for Oceania trade lanes.' },
            { name: 'Japan', coords: [35.6762, 139.6503], type: 'Network Office', description: 'Strategic logistics support for Japan\'s global trade networks.' },
            { name: 'Switzerland', coords: [46.8182, 8.2275], type: 'Network Office', description: 'Specialized inland logistics and freight forwarding coordination.' },
            { name: 'United Kingdom', coords: [51.5074, -0.1278], type: 'Regional Hub', description: 'Advanced logistics coordination for UK industrial and retail sectors.' },
            { name: 'Malaysia', coords: [3.1390, 101.6869], type: 'Network Office', description: 'Strategic maritime support in Southeast Asia\'s growing economy.' },
            { name: 'South Africa', coords: [-33.9249, 18.4241], type: 'Regional Hub', description: 'Major gateway for Southern African trade and logistics.' },
            { name: 'Belgium', coords: [51.2194, 4.4025], type: 'Network Office', description: 'European logistics hub specializing in bulk and containerized cargo.' },
            { name: 'Thailand', coords: [13.7563, 100.5018], type: 'Network Office', description: 'Serving the industrial heartland of Southeast Asia.' },
            { name: 'Vietnam', coords: [10.8231, 106.6297], type: 'Network Office', description: 'High-growth logistics hub for manufacturing and textile exports.' },
            { name: 'Italy', coords: [41.8719, 12.5674], type: 'Network Office', description: 'Mediterranean logistics gateway for Southern Europe.' },
            { name: 'Qatar', coords: [25.2854, 51.5310], type: 'Network Office', description: 'Specialized logistics services for the energy and infrastructure sectors.' },
            { name: 'France', coords: [48.8566, 2.3522], type: 'Regional Hub', description: 'Strategic Western European hub for global trade and logistics.' },
            { name: 'Bangladesh', coords: [22.3475, 91.8123], type: 'Network Office', description: 'Essential maritime gateway for South Asian textile and garment trade.' },
            { name: 'Turkey', coords: [41.0082, 28.9784], type: 'Regional Hub', description: 'Transcontinental logistics hub connecting Europe and Asia.' },
            { name: 'Canada', coords: [49.2827, -123.1207], type: 'Regional Hub', description: 'North American gateway for trans-Pacific trade and project cargo.' },
            { name: 'Brazil', coords: [-23.9618, -46.3322], type: 'Regional Hub', description: 'Largest maritime gateway in South America for commodities and goods.' },
            { name: 'Mexico', coords: [19.4326, -99.1332], type: 'Strategic Hub', description: 'Emerging gateway for Mexico and Latin American market sectors.' },
            { name: 'Nepal', coords: [27.7172, 85.3240], type: 'Network Office', description: 'Specialized landlocked logistics and transshipment services.' },
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
        center: [34.0, 110.0],
        zoom: 4,
        locations: [
            { name: 'Port of Shanghai (CNSHA)', coords: [31.2304, 121.4737], type: 'Primary Port', description: 'China’s largest and most strategic port, Shanghai sits at the meeting point of the Yangtze River and coastal trade routes, connecting inland China to global shipping lanes. Operated by SIPG, it has world-class road/rail connectivity and massive cargo distribution networks, making it a key gateway for exports like cars and electronics and imports like iron ore and processors.' },
            { name: 'Port of Shenzhen (CNSZX)', coords: [22.5431, 114.0579], type: 'Primary Port', description: 'Located in Guangdong along a 260 km coastline, Shenzhen is one of China’s most important foreign-trade hubs, linking to 300+ ports across 100+ countries through 230 international routes. Its key zones (Yantian, Nanshan, Dachan Bay) focus strongly on container shipping, supporting exports like electronics, computers, and mobile devices.' },
            { name: 'Port of Ningbo-Zhoushan (CNNGB)', coords: [29.8683, 121.5440], type: 'Primary Port', description: 'Managed by Zhejiang Seaport Group, this port is a giant in deep-water infrastructure with 19 port areas and 200+ deep-water berths, making it a global leader in cargo throughput. It is a major gateway for trade with the EU, US, and ASEAN, and is especially strong in bulk commodities like crude oil imports.' },
            { name: 'Port of Guangzhou (CNCAN)', coords: [23.1291, 113.2644], type: 'Primary Port', description: 'South China’s largest comprehensive port, Guangzhou is a major logistics and economic hub for the Pearl River Delta and surrounding provinces. With strong multi-modal connectivity (waterway, rail, road, air), it serves 300+ ports in 80+ countries and supports exports ranging from traditional goods like tea and silk to industrial commodities.' },
            { name: 'Port of Hong Kong (HKHKG)', coords: [22.3964, 114.1095], type: 'Primary Port', description: 'A deep-water port centered around Victoria Harbor, Hong Kong is a long-standing global container and maritime movement hub, historically ranked among the world’s busiest. It mainly handles containerized manufactured goods, with strong trade links across Asia and beyond, supported by multiple berths and dedicated mid-stream yard sites.' },
            { name: 'Port of Qingdao (CNTAO)', coords: [36.0671, 120.3826], type: 'Primary Port', description: 'Situated on the Yellow Sea in Shandong, Qingdao is among the world’s busiest ports and plays a major role in Northeast Asia logistics. It operates through multiple port sections handling both domestic and international cargo, with strong capabilities in bulk commodities like iron ore, grains, steel products, and fertilizers.' },
            { name: 'Port of Tianjin (CNTXG)', coords: [38.9673, 117.7416], type: 'Primary Port', description: 'The largest port in Northern China and Beijing’s main sea gateway, Tianjin handles huge volumes of cargo annually and operates year-round. It is well known for bulk liquid and oil cargo handling, including specialized facilities for chemicals and edible oils, along with strong import-export activity in machinery and electronics.' },
            { name: 'Port of Dalian (CNDLC)', coords: [38.9140, 121.6147], type: 'Primary Port', description: 'China’s northernmost ice-free port, Dalian is a major deep-water transshipment hub with 80+ berths and strong links to Pacific Rim trade. It primarily handles refined oil, coal, grain, and mineral oil, supported by good rail/road connectivity and modernized deep berths for large vessels.' },
            { name: 'Port of Xiamen (CNXMN)', coords: [24.4798, 118.0894], type: 'Primary Port', description: 'A major deep-sea port in Southeast China, Xiamen can handle mega vessels and became a larger global hub after merging with Zhangzhou. With 74 berths across 12 zones and advanced technology, it serves major global routes across Europe, the Americas, and Africa, handling both cargo and passenger ferry services.' },
        ]
    },
    'india-trucking': {
        name: 'Indian Trucking network',
        center: [22.0, 78.0],
        zoom: 5,
        locations: [
            // Delhi NCR
            { name: 'Delhi', coords: [28.6139, 77.2090], type: 'Trucking Hub', state: 'Delhi NCR' },
            { name: 'Gurugram', coords: [28.4595, 77.0266], type: 'Trucking Hub', state: 'Delhi NCR' },
            { name: 'Faridabad', coords: [28.4089, 77.3178], type: 'Trucking Hub', state: 'Delhi NCR' },
            { name: 'Manesar', coords: [28.3723, 76.9196], type: 'Trucking Hub', state: 'Delhi NCR' },
            { name: 'Panipat', coords: [29.3989, 76.9771], type: 'Trucking Hub', state: 'Haryana' },
            { name: 'Sonipat', coords: [28.9931, 77.0151], type: 'Trucking Hub', state: 'Haryana' },
            { name: 'Karnal', coords: [29.6857, 76.9905], type: 'Trucking Hub', state: 'Haryana' },

            // Rajasthan
            { name: 'Jaipur', coords: [26.9124, 75.7873], type: 'Trucking Hub', state: 'Rajasthan' },
            { name: 'Bhiwadi', coords: [28.2102, 76.8606], type: 'Trucking Hub', state: 'Rajasthan' },
            { name: 'Neemrana', coords: [27.9889, 76.3883], type: 'Trucking Hub', state: 'Rajasthan' },
            { name: 'Kota', coords: [25.2138, 75.8648], type: 'Trucking Hub', state: 'Rajasthan' },

            // Uttar Pradesh
            { name: 'Kanpur', coords: [26.4499, 80.3319], type: 'Trucking Hub', state: 'Uttar Pradesh' },
            { name: 'Lucknow', coords: [26.8467, 80.9462], type: 'Trucking Hub', state: 'Uttar Pradesh' },
            { name: 'Noida / Greater Noida', coords: [28.5355, 77.3910], type: 'Trucking Hub', state: 'Uttar Pradesh' },
            { name: 'Ghaziabad', coords: [28.6692, 77.4538], type: 'Trucking Hub', state: 'Uttar Pradesh' },
            { name: 'Agra', coords: [27.1767, 78.0081], type: 'Trucking Hub', state: 'Uttar Pradesh' },
            { name: 'Meerut', coords: [28.9845, 77.7064], type: 'Trucking Hub', state: 'Uttar Pradesh' },

            // North
            { name: 'Haridwar', coords: [29.9457, 78.1642], type: 'Trucking Hub', state: 'Uttarakhand' },
            { name: 'Rudrapur (SIDCUL)', coords: [28.9806, 79.4147], type: 'Trucking Hub', state: 'Uttarakhand' },
            { name: 'Baddi', coords: [30.9578, 76.7914], type: 'Trucking Hub', state: 'Himachal Pradesh' },

            // Gujarat
            { name: 'Ahmedabad', coords: [23.0225, 72.5714], type: 'Trucking Hub', state: 'Gujarat' },
            { name: 'Surat', coords: [21.1702, 72.8311], type: 'Trucking Hub', state: 'Gujarat' },
            { name: 'Vadodara', coords: [22.3072, 73.1812], type: 'Trucking Hub', state: 'Gujarat' },
            { name: 'Rajkot', coords: [22.3039, 70.8022], type: 'Trucking Hub', state: 'Gujarat' },
            { name: 'Jamnagar', coords: [22.4707, 70.0577], type: 'Trucking Hub', state: 'Gujarat' },
            { name: 'Bharuch / Ankleshwar', coords: [21.6264, 73.0152], type: 'Trucking Hub', state: 'Gujarat' },
            { name: 'Vapi', coords: [20.3717, 72.9106], type: 'Trucking Hub', state: 'Gujarat' },

            // Maharashtra
            { name: 'Mumbai', coords: [19.0760, 72.8777], type: 'Trucking Hub', state: 'Maharashtra' },
            { name: 'Pune', coords: [18.5204, 73.8567], type: 'Trucking Hub', state: 'Maharashtra' },
            { name: 'Nagpur', coords: [21.1458, 79.0882], type: 'Trucking Hub', state: 'Maharashtra' },
            { name: 'Nashik', coords: [19.9975, 73.7898], type: 'Trucking Hub', state: 'Maharashtra' },
            { name: 'Aurangabad', coords: [19.8762, 75.3433], type: 'Trucking Hub', state: 'Maharashtra' },
            { name: 'Bhiwandi', coords: [19.2991, 73.0645], type: 'Trucking Hub', state: 'Maharashtra' },
            { name: 'Navi Mumbai / Taloja', coords: [19.0330, 73.0297], type: 'Trucking Hub', state: 'Maharashtra' },

            // Madhya Pradesh
            { name: 'Indore (Pithampur)', coords: [22.6107, 75.6809], type: 'Trucking Hub', state: 'Madhya Pradesh' },
            { name: 'Bhopal', coords: [23.2599, 77.4126], type: 'Trucking Hub', state: 'Madhya Pradesh' },
            { name: 'Jabalpur', coords: [23.1815, 79.9864], type: 'Trucking Hub', state: 'Madhya Pradesh' },
            { name: 'Gwalior', coords: [26.2124, 78.1772], type: 'Trucking Hub', state: 'Madhya Pradesh' },

            // Chhattisgarh
            { name: 'Raipur', coords: [21.2514, 81.6296], type: 'Trucking Hub', state: 'Chhattisgarh' },
            { name: 'Bhilai / Durg', coords: [21.1938, 81.3509], type: 'Trucking Hub', state: 'Chhattisgarh' },
            { name: 'Korba', coords: [22.3595, 82.7501], type: 'Trucking Hub', state: 'Chhattisgarh' },

            // West Bengal
            { name: 'Kolkata', coords: [22.5726, 88.3639], type: 'Trucking Hub', state: 'West Bengal' },
            { name: 'Durgapur', coords: [23.5204, 87.3119], type: 'Trucking Hub', state: 'West Bengal' },
            { name: 'Asansol', coords: [23.6739, 86.9797], type: 'Trucking Hub', state: 'West Bengal' },
            { name: 'Haldia', coords: [22.0645, 88.0772], type: 'Trucking Hub', state: 'West Bengal' },
            { name: 'Siliguri', coords: [26.7271, 88.3953], type: 'Trucking Hub', state: 'West Bengal' },

            // Odisha
            { name: 'Bhubaneswar', coords: [20.2961, 85.8245], type: 'Trucking Hub', state: 'Odisha' },
            { name: 'Paradip', coords: [20.2743, 86.6661], type: 'Trucking Hub', state: 'Odisha' },
            { name: 'Cuttack', coords: [20.4624, 85.8830], type: 'Trucking Hub', state: 'Odisha' },
            { name: 'Rourkela', coords: [22.2604, 84.8536], type: 'Trucking Hub', state: 'Odisha' },
            { name: 'Angul / Talcher', coords: [20.8504, 85.1011], type: 'Trucking Hub', state: 'Odisha' },

            // Jharkhand
            { name: 'Ranchi', coords: [23.3441, 85.3096], type: 'Trucking Hub', state: 'Jharkhand' },
            { name: 'Jamshedpur', coords: [22.8046, 86.2029], type: 'Trucking Hub', state: 'Jharkhand' },
            { name: 'Bokaro', coords: [23.6693, 86.1511], type: 'Trucking Hub', state: 'Jharkhand' },

            // Bihar
            { name: 'Patna', coords: [25.5941, 85.1376], type: 'Trucking Hub', state: 'Bihar' },
            { name: 'Muzaffarpur', coords: [26.1209, 85.3647], type: 'Trucking Hub', state: 'Bihar' },
            { name: 'Gaya', coords: [24.7914, 85.0002], type: 'Trucking Hub', state: 'Bihar' },

            // Assam
            { name: 'Guwahati', coords: [26.1445, 91.7362], type: 'Trucking Hub', state: 'Assam' },
            { name: 'Dibrugarh', coords: [27.4728, 94.9120], type: 'Trucking Hub', state: 'Assam' },
            { name: 'Silchar', coords: [24.8333, 92.7789], type: 'Trucking Hub', state: 'Assam' },

            // Tamil Nadu
            { name: 'Chennai', coords: [13.0827, 80.2707], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Coimbatore', coords: [11.0168, 76.9558], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Salem', coords: [11.6643, 78.1460], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Hosur', coords: [12.7409, 77.8253], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Tiruppur', coords: [11.1085, 77.3411], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Madurai', coords: [9.9252, 78.1198], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Erode', coords: [11.3410, 77.7172], type: 'Trucking Hub', state: 'Tamil Nadu' },
            { name: 'Sriperumbudur / Oragadam', coords: [12.9100, 79.9500], type: 'Trucking Hub', state: 'Tamil Nadu' },

            // Karnataka
            { name: 'Bengaluru', coords: [12.9716, 77.5946], type: 'Trucking Hub', state: 'Karnataka' },
            { name: 'Hubballi–Dharwad', coords: [15.3647, 75.1240], type: 'Trucking Hub', state: 'Karnataka' },
            { name: 'Mangaluru', coords: [12.9141, 74.8560], type: 'Trucking Hub', state: 'Karnataka' },
            { name: 'Belagavi', coords: [15.8497, 74.4977], type: 'Trucking Hub', state: 'Karnataka' },

            // Telangana
            { name: 'Hyderabad', coords: [17.3850, 78.4867], type: 'Trucking Hub', state: 'Telangana' },
            { name: 'Warangal', coords: [18.0000, 79.5800], type: 'Trucking Hub', state: 'Telangana' },

            // Andhra Pradesh
            { name: 'Visakhapatnam', coords: [17.6868, 83.2185], type: 'Trucking Hub', state: 'Andhra Pradesh' },
            { name: 'Vijayawada', coords: [16.5062, 80.6480], type: 'Trucking Hub', state: 'Andhra Pradesh' },
            { name: 'Guntur', coords: [16.3067, 80.4365], type: 'Trucking Hub', state: 'Andhra Pradesh' },
            { name: 'Tirupati', coords: [13.6288, 79.4192], type: 'Trucking Hub', state: 'Andhra Pradesh' },
            { name: 'Sri City (Nellore belt)', coords: [13.5200, 80.0300], type: 'Trucking Hub', state: 'Andhra Pradesh' },
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
    const [view, setView] = useState<{ center: [number, number], zoom: number }>({
        center: regions['global'].center,
        zoom: regions['global'].zoom
    });

    const handleLocationClick = (loc: PortLocation) => {
        setSelectedLocation(loc);
        if (activeRegion === 'india-trucking' && loc.state && stateViews[loc.state]) {
            setView(stateViews[loc.state]);
        }
    };

    const handleRegionChange = (key: string) => {
        setActiveRegion(key);
        setSelectedLocation(null);
        setView({
            center: regions[key].center,
            zoom: regions[key].zoom
        });
    };

    return (
        <div className="relative w-full h-[600px] md:h-[650px] rounded-3xl overflow-hidden border border-gray-100 group z-0">
            {/* Map Container */}
            <MapContainer
                center={view.center}
                zoom={view.zoom}
                className="h-full w-full"
                zoomControl={false}
                scrollWheelZoom={false}
            >
                <ChangeView center={view.center} zoom={view.zoom} />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    className="map-tiles"
                />

                {regions[activeRegion].locations.map((loc, idx) => (
                    <Marker
                        key={`${activeRegion}-${idx}`}
                        position={loc.coords}
                        icon={selectedLocation?.name === loc.name ? activeOrangeIcon : defaultOrangeIcon}
                        eventHandlers={{
                            click: () => handleLocationClick(loc),
                        }}
                    />
                ))}
            </MapContainer>

            {/* In-Map Region Selector */}
            <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-blue-900/10 flex flex-col gap-1.5">
                    {Object.entries(regions).map(([key, region]) => (
                        <button
                            key={key}
                            onClick={() => handleRegionChange(key)}
                            className={`px-5 py-3 rounded-xl font-lato font-bold text-xs transition-all duration-300 text-left min-w-[160px] ${activeRegion === key
                                ? 'bg-[#FF6600] text-white shadow-lg translate-x-1'
                                : 'text-[#000040]/70 hover:bg-gray-50 hover:text-[#000040]'
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
                    background-color: #f0f4f8 !important;
                }
            `}} />
        </div>
    );
};

export default PortMap;
