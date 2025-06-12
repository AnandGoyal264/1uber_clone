const mapservice = require('../services/mapservice.js');
const {query}= require('express-validator')


module.exports.getCoordinates = async (req, res) => {
  const { address } = req.query;
  try {
    const coordinates = await mapservice.getAddressCoordinates(address);
    res.json({ coordinates });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.getDistanceAndTime=async (req,res)=>{
    const { origin, destination } = req.query;
    try {
        const result = await mapservice.getDistanceTime(origin, destination);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    

};
module.exports.getSuggestions =async (req,res)=>{
    const { query } = req.query;

    try {
        const suggestions = await mapservice.getsuggestions(query);
        res.json({ suggestions });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}