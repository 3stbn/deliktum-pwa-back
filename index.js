const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const events = require('./routes/events');
const clusters = require('./routes/clusters');

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use('/api/events' , events);
app.use('/api/clusters' , clusters);
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost/deliktum', { useNewUrlParser: true } )
    .then( () => console.log('Conectado a la base de datos'))
    .catch( (err) => console.log(err));

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Listen on port:  ${port} ....`))