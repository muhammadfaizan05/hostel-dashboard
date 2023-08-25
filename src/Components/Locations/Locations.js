import React from 'react';
import { useEffect } from 'react';
import styles from './locations.module.css'
import { useState } from 'react';
import axios from 'axios';
import {geofencing} from '../GeoFencing/Fencing'
import { Link } from 'react-router-dom';
const Locations = () => {

let [locationsdata, setlocationsdata] = useState([]);
let [usename,setusername]=useState([]);
useEffect(() => {
    axios
      .get('http://localhost:1000/getlocations')
      .then((response) => setlocationsdata(response.data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);
  console.log(locationsdata);
return (
        <div className={styles.locationsrootclass}>
            <h3 className='font-semibold text-2xl text-indigo-500 mt-2 mb-2'>Student Locations & Geofencing</h3>
            <p>Click on any student to see his locations</p>
            <table className={styles.locationtable}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Coordinates</th>
            <th>Inside/Outside</th>
            <th>See on map</th>
          </tr>
            {locationsdata.map((item)=>{
                return <tr className={styles.retuningrow}>
                    <td style={{textAlign:'left'}}>{item._id}</td>
                    <td>{item.name}</td>
                    <td className={styles.list}><li>{item.locations[0][0]}</li><li>{item.locations[0][1]}</li></td>
                    <td className={styles.imgtd}><div>{(geofencing(item.locations[0][0],item.locations[0][1]))?<img src='Pictogram-Signage-Sign-Icon-Symbol-Safe-Zone-6773809.png'/>:<img src='out.jpg'/>}</div></td>
                    <td><Link to={'/maps/'+item.id}>Go to Map</Link></td>
                </tr>
            })}
            </table>
        </div>
    )
}

export default Locations























// // Initialize the map.
// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 8,
//       center: { lat: 40.72, lng: -73.96 },
//     });
//     const geocoder = new google.maps.Geocoder();
//     const infowindow = new google.maps.InfoWindow();
  
//     document.getElementById("submit").addEventListener("click", () => {
//       geocodePlaceId(geocoder, map, infowindow);
//     });
//   }
  
//   // This function is called when the user clicks the UI button requesting
//   // a geocode of a place ID.
//   function geocodePlaceId(geocoder, map, infowindow) {
//     const placeId = document.getElementById("place-id").value;
  
//     geocoder
//       .geocode({ placeId: placeId })
//       .then(({ results }) => {
//         if (results[0]) {
//           map.setZoom(11);
//           map.setCenter(results[0].geometry.location);
  
//           const marker = new google.maps.Marker({
//             map,
//             position: results[0].geometry.location,
//           });
  
//           infowindow.setContent(results[0].formatted_address);
//           infowindow.open(map, marker);
//         } else {
//           window.alert("No results found");
//         }
//       })
//       .catch((e) => window.alert("Geocoder failed due to: " + e));
//   }
//   initMap();
