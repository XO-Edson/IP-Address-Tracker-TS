import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useIpData } from "../context/data";
import { Icon } from "leaflet";
import mapPin from "../assets/images/icon-location.svg";

type IconProps = {
  iconUrl: string;
  iconSize: [number, number];
};

const HomePage = () => {
  const ipData = useIpData();

  console.log(ipData);

  const customIcon: IconProps = {
    iconUrl: mapPin,
    iconSize: [38, 38],
  };

  const position = ipData ? [ipData.location.lat, ipData.location.lng] : null;

  const iconInstance = new Icon(customIcon);

  return (
    <main>
      <section className="background">
        <div className="searchBar">
          <h1>IP Address Tracker</h1>
        </div>
        <section className="ip-details">
          <p>IP ADDRESS : {ipData?.ip}</p>
          <p>LOCATION : {ipData?.location.country}</p>
          <p>TIMEZONE: {ipData?.location.timezone}</p>
          <p>ISP : {ipData?.isp}</p>
        </section>
      </section>

      <section>
        <div className="map">
          <MapContainer
            center={[-1.286389, 36.817223]}
            zoom={13}
            style={{ height: "780px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={
                [ipData?.location.lat, ipData?.location.lng] || undefined
              }
              icon={iconInstance}
            ></Marker>
          </MapContainer>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
