require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).array('file', 10);

const Router = require('./routes');

const app = express();

app.use(upload);





app.use(express.json());
app.use(cors());




app.use('/api/v1/destination', Router);


app.get('/', (req, res) => {
    try{
        res.status(200).send({message : 'Welcome to Destination API!'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in destination server'});
    }
    
});

module.exports = app;