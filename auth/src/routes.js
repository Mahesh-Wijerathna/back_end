const express = require('express');
const router = express.Router();

const Controller = require('./controller');
// const verifyToken = require('./verifyToken');

router.get('/home',(req,res) => {
    let message = 'Message... \n';
    try{
        message += 'You are in Router!\n';
        res.status(200).send({message: 'You are in Router!'});
    }
    catch(err){
        console.log(message);
        return res.status(500).send(message);
    }
    
} );
router.post('/', Controller.register);
router.get('/', Controller.getUser);
router.post('/login', Controller.login);
router.put('/', Controller.update);
router.delete('/', Controller.delete);


router.get('/verify_token', Controller.verifyToken);



module.exports = router;