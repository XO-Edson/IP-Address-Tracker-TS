import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useIpData } from "../context/data";
import { Icon } from "leaflet";
import mapPin from "../assets/images/icon-location.svg";
import ButtonIcon from "../assets/images/icon-arrow.svg";

type IconProps = {
  iconUrl: string;
  iconSize: [number, number];
};

const HomePage = () => {
  const { ipData, IPAddressFn, ipAddress, ipAddressStatic, searchBtn } =
    useIpData();

  console.log(ipAddressStatic);

  const customIcon: IconProps = {
    iconUrl: mapPin,
    iconSize: [38, 38],
  };
  const iconInstance = new Icon(customIcon);

  return (
    <main>
      <section className="background">
        <div className="searchBar">
          <h1>IP Address Tracker</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              value={ipAddress}
              onChange={IPAddressFn}
            />
            <button onClick={() => searchBtn}>
              <img src={ButtonIcon} alt="button icon" />
            </button>
          </div>
        </div>
        <section className="ip-details">
          <div>
            <p>IP ADDRESS </p>
            <h2>{ipData?.ip}</h2>
          </div>

          <div>
            <p>LOCATION</p>
            <h2> {ipData?.location.country}</h2>
          </div>

          <div>
            <p>TIMEZONE </p>
            <h2>{ipData?.location.timezone}</h2>
          </div>

          <div>
            <p>ISP </p>
            <h2>{ipData?.isp}</h2>
          </div>
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
              position={[ipData?.location.lat ?? 0, ipData?.location.lng ?? 0]}
              icon={iconInstance}
            ></Marker>
          </MapContainer>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
