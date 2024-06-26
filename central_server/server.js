const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');


const app = express();
app.use(cors());

app.use('/auth'       , proxy('https://ds-auth.onrender.com'));
app.use('/tourist'    , proxy('https://ds-tourist.onrender.com'));
app.use('/m_center'   , proxy('https://ds-m_center.onrender.com'));
app.use('/destination', proxy('https://ds-desrination.onrender.com'));
app.use('/appointment', proxy('https://ds-appointment.onrender.com'));
app.use('/',(req,res,next) => {
    try{
        return res.status(200).json({message: 'Welcome to the central_server'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in central server'});
    }
        
});
app.listen(4000, () => {
    console.log('Central server running on port 4000');
});

module.exports = app;