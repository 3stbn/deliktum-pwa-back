const {Event} = require('../models/Event');

const eventsController = {
    list: async function (req,res) {
        try {
            const events = await Event.find();
            res.status(200).send(events);
        } catch (ex) {
            console.log(ex.message);
            res.status(500).send('Internar server error');
        }        
    },
    create: async function  (req, res) {
        /* const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message); */
        const event = new Event( req.body )
        try {
            const result = await event.save();
            result.properties.eventId = result._id;
            result.save();
            res.status(200).send(result);
        } catch (ex) {
            for (field in ex.errors){
                console.log(ex.errors[field].message )
                
            }
            res.status(400).send('Bad Request')
        }       
    },
    find: async function (req,res) {
        const id = String(req.params.id);
        try {
            const event = await Event.findById(id)
            res.status(200).send(event);
        } catch (ex) {
            console.log(ex.message);
            res.status(404).send('Not found')
        }        
    },
    uploadImage: async function(req,res) {
    const id = String(req.params.id);
        try {
            const event = await Event.findByIdAndUpdate( id , {
              $set: {
                image: req.file.path
              }
            }, {new: true});
            res.status(200).send(event);
        } catch (ex) {
            console.log(ex.message);
            res.status(404).send('Not found')
        }          
    }
}

module.exports = eventsController;