import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useIpData } from "../context/data";
import { Icon } from "leaflet";
import mapPin from "../assets/images/icon-location.svg";
import ButtonIcon from "../assets/images/icon-arrow.svg";
import { useEffect } from "react";

type IconProps = {
  iconUrl: string;
  iconSize: [number, number];
};

const HomePage = () => {
  const { ipData, IPAddressFn, ipAddress, searchBtn, mapRef } = useIpData();

  useEffect(() => {
    // Log to check if ipData is changing properly
    console.log(ipData);
  }, [ipData]);

  console.log(ipData);

  const customIcon: IconProps = {
    iconUrl: mapPin,
    iconSize: [38, 38],
  };
  const iconInstance = new Icon(customIcon);

  return (
    <main>
      <section className="background">
        <div className="searchBar">
          <h2>IP Address Tracker</h2>
          <div className="input-field">
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              value={ipAddress}
              onChange={IPAddressFn}
            />
            <button onClick={() => searchBtn(ipAddress ?? "")}>
              <img src={ButtonIcon} alt="button icon" />
            </button>
          </div>
        </div>
        <section className="ip-details">
          <div>
            <p>IP ADDRESS </p>
            <h4>{ipData?.ip}</h4>
          </div>

          <div>
            <p>LOCATION</p>
            <h4> {ipData?.location.country}</h4>
          </div>

          <div>
            <p>TIMEZONE </p>
            <h4>{ipData?.location.timezone}</h4>
          </div>

          <div>
            <p>ISP </p>
            <h4>{ipData?.isp}</h4>
          </div>
        </section>
      </section>

      <section>
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
      </section>
    </main>
  );
};

export default HomePage;
