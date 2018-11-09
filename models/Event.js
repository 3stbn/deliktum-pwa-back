const mongoose = require('mongoose');
const Joi = require('joi');

/* function validateEvent(data) {
  const schema = {
    type: Joi.string().length(40).required(),
    imagen: Joi.string().length(40)
  }
  return Joi.validate(data, schema)
}
 */
const GeoSchema = new mongoose.Schema({
  type: { type: String, default: 'Point' },
  coordinates: {type: [Number], index: '2dsphere'}
},{ _id : false });
const propetiesSchema = new mongoose.Schema({
  type: { type: String, required: true, maxlength: 40 },
  description: { type: String, required: true, maxlength: 200 },
  date: { type: String, required: true, maxlength: 100 },
  eventId: {type: String, default:'0'}
},{ _id : false });

const eventSchema = new mongoose.Schema({  
  properties: propetiesSchema,
  type: { type: String, default: 'Feature' },
  image: { type: String, maxlength: 100 },
  geometry: GeoSchema
});


const Event = mongoose.model('events', eventSchema);

exports.Event = Event;
/* exports.validate = validateEvent;  */