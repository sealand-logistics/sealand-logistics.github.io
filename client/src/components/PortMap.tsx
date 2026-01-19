import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ports = [
    { name: 'Kolkata', coords: [22.5726, 88.3639] as [number, number] },
    { name: 'Haldia', coords: [22.0645, 88.0772] as [number, number] },
    { name: 'Nhava Sheva (JNPT)', coords: [18.9497, 72.9482] as [number, number] },
    { name: 'Mundra', coords: [22.8256, 69.7431] as [number, number] },
    { name: 'Paradeep', coords: [20.2706, 86.6664] as [number, number] },
    { name: 'Visakhapatnam', coords: [17.6868, 83.2185] as [number, number] },
    { name: 'Gangavaram', coords: [17.6253, 83.2427] as [number, number] },
    { name: 'Chennai', coords: [13.0827, 80.2707] as [number, number] },
    { name: 'Tuticorin', coords: [8.7642, 78.1348] as [number, number] },
];

const PortMap = () => {
    return (
        <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-md z-0">
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className="h-full w-full"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {ports.map((port, idx) => (
                    <Marker key={idx} position={port.coords}>
                        <Popup>
                            <span className="font-lato font-bold text-[#000040]">{port.name} Service</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default PortMap;
