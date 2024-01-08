import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HomePage = () => {
  return (
    <main>
      <section className="background">
        <section className="ip-details">
          <p>IP ADDRESS</p>
          <p>LOCATION</p>
          <p>TIMEZONE</p>
          <p>ISP</p>
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
          </MapContainer>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
