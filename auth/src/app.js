require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const Router = require('./routes');

const app = express();



app.use(multer().any());
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', Router);    




app.get('/', (req, res,next) => {
    //res.send('Welcome to the Auth API!');
    try{
        res.status(200).send({message: 'Welcome to the Auth API!'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in auth server'});
    }
});

module.exports = app;