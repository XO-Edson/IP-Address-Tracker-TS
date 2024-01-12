import "leaflet/dist/leaflet.css";
import { useIpData } from "../context/data";

import ButtonIcon from "../assets/images/icon-arrow.svg";
import Map from "./Map";

const HomePage = () => {
  const { ipData, IPAddressFn, ipAddress, searchBtn } = useIpData();

  console.log(ipData);

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
          <div className="details-container">
            <p>IP ADDRESS </p>

            <div className="border">
              <h4>{ipData?.ip}</h4>
            </div>
          </div>

          <div className="details-container">
            <p>LOCATION</p>

            <div className="border">
              <h4> {ipData?.location.country}</h4>
            </div>
          </div>

          <div className="details-container">
            <p>TIMEZONE </p>
            <div className="border">
              <h4>{ipData?.location.timezone}</h4>
            </div>
          </div>

          <div className="details-container">
            <p>ISP </p>
            <h4>{ipData?.isp}</h4>
          </div>
        </section>
      </section>
      <Map />
    </main>
  );
};

export default HomePage;
