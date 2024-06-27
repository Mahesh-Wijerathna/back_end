const express = require('express');
const router = express.Router();

const Controller = require('./controller');
// const verify = require('./verify');
// const image_handler = require('./multer');

router.get('/home', (req, res) => {
    try{
        res.status(200).send({message : 'You are in Destination Router!'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in destination server'});
    }
    
});


router.post('/', Controller.register);
// router.put('/', Controller.update);
router.get('/search', Controller.search_by_name);
router.get('/', Controller.get_all);
router.put('/' , Controller.update)
// router.get('/:name', Controller.get_by_name);
router.delete('/', Controller.delete_all);

module.exports = router;