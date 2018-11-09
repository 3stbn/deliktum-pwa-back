const router = require('express').Router();
const {Event} = require('../models/Event');

router.get('/' , async (req, res) => { 
  try {
    const events = await Event.find().select(['-__v']);
    res.status(200).send({
      "type": "FeatureCollection",
      "features": events      
    });
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send('Internar server error');
  }   
});


module.exports = router;