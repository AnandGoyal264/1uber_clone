const axios = require('axios');
const captainmodel=require('../models/captain_models.js');
const socket =require('../socket.js')


module.exports.getAddressCoordinates = async (address) => {
    const addrkkkkkkkkkess = 'Kannod Rd, Satwas, Madhya Pradesh 455459';

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon)
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates');
  }
};


module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Both origin and destination are required');
  }

  try {
    // Geocode origin
    const originResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: origin,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'YourAppName/1.0 (your.email@example.com)'
      }
    });

    if (originResponse.data.length === 0) {
      throw new Error('Origin address not found');
    }

    const originCoords = {
      lat: parseFloat(originResponse.data[0].lat),
      lon: parseFloat(originResponse.data[0].lon)
    };

    // Geocode destination
    const destinationResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: destination,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'YourAppName/1.0 (your.email@example.com)'
      }
    });

    if (destinationResponse.data.length === 0) {
      throw new Error('Destination address not found');
    }

    const destinationCoords = {
      lat: parseFloat(destinationResponse.data[0].lat),
      lon: parseFloat(destinationResponse.data[0].lon)
    };

    // Calculate distance using Haversine formula
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(destinationCoords.lat - originCoords.lat);
    const dLon = toRad(destinationCoords.lon - originCoords.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(originCoords.lat)) *
        Math.cos(toRad(destinationCoords.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return {
      origin: originCoords,
      destination: destinationCoords,
      distance: distance.toFixed(2) + ' km'
    };
  } catch (error) {
    throw new Error('Failed to fetch coordinates or calculate distance: ' + error.message);
  }
};

const cache = new Map();

module.exports.getsuggestions = async (input) => {
  if (!input) {
    throw new Error('Input is required');
  }

  // Check cache
  if (cache.has(input)) {
    console.log("✅ Cache hit for:", input);
    return cache.get(input);
  }

  // Respect Nominatim rate limit (max 1 req/sec)
  await new Promise(resolve => setTimeout(resolve, 1100));

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'my-uber-app/1.0 (anandgoyal9171@gmail.com)' // Replace with your contact
      }
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      cache.set(input, response.data); // Save in cache
      return response.data;
    } else {
      console.error("❌ Unexpected API response format:", response.data);
      throw new Error('Unexpected response from Nominatim');
    }

  } catch (error) {
    if (error.response) {
      console.error("💥 HTTP error:", error.response.status);
      console.error("💥 Response data:", JSON.stringify(error.response.data));
    } else {
      console.error("💥 Network/Request error:", error.message);
    }

    throw new Error(
      `Failed to fetch suggestions: ${error.response?.status || error.message}`
    );
  }
};
module.exports.getCaptainRadius=async (ltd,lng,radius)=>{
  //console.log({ ltd, lng, radius });
  console.log("inside getCaptainRadius function");
  /*const captain=await captainmodel.find({
    location:{
      $geoWithin:{
        $centerSphere:[[lng,ltd],radius/6371]

      }
    }
  })*/
 const captain=await captainmodel.find({});
  return captain;
 
}

