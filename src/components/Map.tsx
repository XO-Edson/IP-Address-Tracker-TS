import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import mapPin from "../assets/images/icon-location.svg";
import { useIpData } from "../context/data";

type IconProps = {
  iconUrl: string;
  iconSize: [number, number];
};

const Map = () => {
  const { ipData, mapRef } = useIpData();

  const customIcon: IconProps = {
    iconUrl: mapPin,
    iconSize: [38, 38],
  };

  const iconInstance = new Icon(customIcon);

  return (
    <div className="map">
      <MapContainer
        ref={mapRef}
        center={[
          ipData?.location.lat || 54.7023545,
          ipData?.location.lng || -3.2765753,
        ]}
        zoom={13}
        style={{ height: "780px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[ipData?.location.lat || 0, ipData?.location.lng || 0]}
          icon={iconInstance}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
