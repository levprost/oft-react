import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";


// Icons sur la map
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = () => {
  const [places, setPlaces] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    displayPlaces();
    displayPlaces();
    checkAuth();
  },[]);

  //pour donner l'acces à admin
  const checkAuth = () => {
    const token = localStorage.getItem("access_token"); // Или sessionStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const displayPlaces = async () => {
    try{
        const res = await axios.get("http://127.0.0.1:8000/api/places");
        setPlaces(res.data);
    }catch (error){
        console.error("Error:", error);
    }
  }

  return (
    <>
    <Container>
    <MapContainer center={[47.3167, -2.2900]} zoom={15} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude_place, place.longitude_place]}
          icon={customIcon}
        >
          <Popup>
            <strong>{place.name_place}</strong> <br />
            {isAuthenticated && (
              <Link to={`/admin/place/edit/${place.id}`} className="btn btn-success me-2">
                Edit
              </Link>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </Container>
    </>
  );
};

export default MapComponent;