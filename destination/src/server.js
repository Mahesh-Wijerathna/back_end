require('dotenv').config();
const mongoose = require('mongoose');

const port = 4004;

const app = require('./app');



mongoose.connect(
    MONGO_URL= 'mongodb+srv://SoftwareProject:SoftwareProject@cluster0.r0hwfhg.mongodb.net/',
    // MONGO_URL= 'localhost:27017',
    {}).then(result => {
        console.clear();
        console.log('Connected to MongoDB Destination Database');
        app.listen(port,() => {
            console.log(`Destination Server is running on port ${port}`);
        });
    }).catch(err => {
        console.log(err);

    });

module.exports = app;