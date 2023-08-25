// import "../../styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import React, { useEffect, useState } from 'react';
import { Icon, divIcon, point } from "leaflet";
import axios from "axios";
import './styles.css';
import { useParams } from 'react-router-dom';

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./download.png"),
  iconSize: [20, 20] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {

  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

export default function MapApp() {

  const  index  = useParams();

  let [locations, setLocations] = useState([]);
  let [length, setLength] = useState(0);

  useEffect(() => {
    fetchLocations(); // Fetch initial locations
    const intervalId = setInterval(fetchLocations, 6000); // Fetch locations every 6 seconds
    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);

  const fetchLocations = async () => {
    try {
      let id=index;
      console.log(id);
      axios
      .get(`http://localhost:1000/specificlocations`,)
      .then((response) => {
        console.log('Data:', response.data);
        setLocations(response.data.locations);
        // response.locations.forEach((item)=>{
        //   let object={geocode:[item[0],item[1]],
        //     popUp:"new added"
        //   }
        //   markers.push(object);     
        //   console.log(markers);
        // })
        // setmarkers([...markers]);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors if needed
      });
    } catch (error) {
      console.error('Error retrieving locations:', error);
    }
  };
  // markers  
  let [markers,setmarkers]=useState([ 
    {
    geocode: [31.4161, 73.0700],
    popUp: "Student Location"
  }
])
  // const markers = [
   
  // ];
  
  // if(length>1){
  //   locations.forEach((item)=>{
  //     let object={geocode:[item[0],item[1]],
  //       popUp:"Faizan Here"
  //     }
  //     markers.push(object);
      
  //     console.log(markers);
  //   })
  //   setmarkers([...markers]);
  // }


  return (
    <div className="rootclass font-semibold text-2xl text-indigo-500 mt-2 mb-2">
      <h3>Map Data</h3>
      <p>Markers on the Map shows as per the location coordinates</p>
    <MapContainer center={[31.4081, 73.1188]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* WATERCOLOR CUSTOM TILES */}
      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
      {/* GOOGLE MAPS TILES */}
      {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

        {/* Hard coded markers */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
       */}
      </MarkerClusterGroup>
    </MapContainer>
    </div>
  );
}
