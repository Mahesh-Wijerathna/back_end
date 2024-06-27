require('dotenv').config();

const mongoose = require('mongoose');
const port = process.env.PORT || 4001

const app = require('./app');
// const app = express();

mongoose.connect(
    'mongodb+srv://SoftwareProject:SoftwareProject@cluster0.r0hwfhg.mongodb.net/',
    {}).then(result => {
        console.log('Connected to MongoDB Authentication Database');
        app.listen(port,() => {
            console.log(`Auth Server is running on port ${port}`);
        });
    }).catch(err => {
        console.log(err);
    });

module.exports = app;
    