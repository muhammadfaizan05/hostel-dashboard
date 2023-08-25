// Function to calculate the distance between two points using the Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) 
                  * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;
  return distance;
}
// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
export function geofencing(lat,lon){
  const centerLat = 31.4161; // Latitude of the center location 
  const centerLon = 73.0700; // Longitude of the center location
  const fenceRadiusKm = 10; // Geo-fence radius in kilometers 
  const distance = getDistanceFromLatLonInKm(centerLat, centerLon, lat, lon);
  if (distance <= fenceRadiusKm) {
        // console.log(`Location (${lat}, ${lon}) is within the geo-fence.`);
        return(true)
      } else {
        // console.log(`Location (${lat}, ${lon}) is outside the geo-fence.`);
        return(false)
      }  
}
geofencing();
  // const locations = [
  //   { lat: 40.7128, lon: -74.0060 }, // New York City (within the fence)
  //   { lat: 34.0522, lon: -118.2437 }, // Los Angeles (outside the fence)
  //   { lat: 51.5074, lon: -0.1278 }, // London (outside the fence)
  // ];
  
  // Check each location against the center location to see if it's within the geo-fence
  // for (const location of locations) {
  //   const distance = getDistanceFromLatLonInKm(centerLat, centerLon, location.lat, location.lon);
  //   if (distance <= fenceRadiusKm) {
  //     console.log(`Location (${location.lat}, ${location.lon}) is within the geo-fence.`);
  //   } else {
  //     console.log(`Location (${location.lat}, ${location.lon}) is outside the geo-fence.`);
  //   }
  // }