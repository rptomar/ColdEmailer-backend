const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const connectDb = require('./config/db');
const flowchartRoutes = require('./routes/flowchartRoutes');
const emailRoutes = require('./routes/emailRoutes');
const { agenda } = require('./config/agenda');


// Initialize body-parser middleware before defining routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Use the correct route path with a leading forward slash


app.use('/api/flowchart', flowchartRoutes);
app.use('/api/email', emailRoutes);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

agenda.start().then(() => {
  console.log('Agenda is ready!');
});

connectDb()
  .then(() => {
    console.log('Connection successful to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log('Error connecting to MongoDB'));