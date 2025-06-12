const axios = require('axios');
const captainmodel = require('../models/captain_models.js');
const socket = require('../socket.js');

// 🌐 Replace with your real token (best to load from env later)
const accessToken = 'pk.215bb1b7314014d97112494713c6b272';

module.exports.getAddressCoordinates = async (address) => {
  if (!address) throw new Error('Address is required');

  const url = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${encodeURIComponent(address)}&format=json`;

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
    throw new Error('Failed to fetch coordinates: ' + error.message);
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Both origin and destination are required');
  }

  try {
    // 🔍 Geocode origin using LocationIQ
    const originUrl = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${encodeURIComponent(origin)}&format=json&limit=1`;
    const originResponse = await axios.get(originUrl);
    if (!originResponse.data.length) throw new Error('Origin address not found');

    const originCoords = {
      lat: parseFloat(originResponse.data[0].lat),
      lon: parseFloat(originResponse.data[0].lon)
    };

    // 🔍 Geocode destination using LocationIQ
    const destUrl = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${encodeURIComponent(destination)}&format=json&limit=1`;
    const destResponse = await axios.get(destUrl);
    if (!destResponse.data.length) throw new Error('Destination address not found');

    const destinationCoords = {
      lat: parseFloat(destResponse.data[0].lat),
      lon: parseFloat(destResponse.data[0].lon)
    };

    // 📏 Haversine Formula
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(destinationCoords.lat - originCoords.lat);
    const dLon = toRad(destinationCoords.lon - originCoords.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(originCoords.lat)) *
        Math.cos(toRad(destinationCoords.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

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
  if (!input) throw new Error('Input is required');

  const url = `https://us1.locationiq.com/v1/autocomplete?key=${accessToken}&q=${encodeURIComponent(input)}&format=json`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch suggestions');
    }
  } catch (error) {
    throw new Error('Failed to fetch suggestions: ' + error.message);
  }
};

module.exports.getCaptainRadius = async (ltd, lng, radius) => {
  console.log("inside getCaptainRadius function");

  // If using geospatial filtering later, uncomment and fix:
  /*
  const captain = await captainmodel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 6371]
      }
    }
  });
  */
  const captain = await captainmodel.find({});
  return captain;
};
