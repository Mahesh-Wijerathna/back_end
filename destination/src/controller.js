const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const DestinationModel = require('./destination');
          
cloudinary.config({ 
  cloud_name: 'dxietqwtt', 
  api_key: '796599715312388', 
  api_secret: 'jTVBMTbK8kmfFOoE2txRLnodyVY' 
});

exports.register = async (req, res) => {
    let message = "Message ...\n";
    try {
        message += "Register function in destination controller\n";
        
        console.log(message);

        // array of string 
        let images = [];
        await Promise.all(req.files.map(file => {
            return cloudinary.uploader.upload(file.path)
                .then(result => {
                    images.push(result.url);
                    message += result.url + "\n";
                    message += "File uploaded  and pushed to images successfully \n";
                    fs.unlinkSync(file.path);
                    message += "File deleted from temp successfully \n";
                })
                .catch(error => {
                    message += "Error in uploading file \n";
                    return res.status(400).send(message);
                });
        }));
        message += "All files uploaded successfully \n";

        console.log(message);

        const name = req.body.name;
        const description = req.body.description;
        const token = req.headers['x-access-token'];
        message += "Name: " + name + "\n"
                + "Description: " + description + "\n";
                + "Token: " + token + "\n";
        console.log(message);
        if(!token){
            message += "Missing token \n";
            return res.status(400).send(message);
        }
        console.log(message);
        if (!name ){
            message += "Missing required fields \n";
            return res.status(400).send(message);
        }
        console.log(message);
        isDestinationExist = await DestinationModel.findOne({name: name}).exec();
        if(isDestinationExist){
            message += "Destination already exists \n";
            return res.status(400).send(message);
        }
        console.log(message);
        const newDestination = new DestinationModel({
            name: name,
            description: description,
            images: images
        });
        const result = await newDestination.save();
        message += "Destination saved in database successfully \n";
        console.log(message);
        return res.status(201).send(result);


        
      } catch (err) {
        message += "Error in uploading fileS \n";
        message += err + "\n";
        console.log(message);
        return res.status(400).send(message);
      }

};

exports.get_all = async (req, res) => {
    let message = "Message ...\n";
    try {
        message += "Get all function in destination controller\n";
        const destinations = await DestinationModel.find().exec();
        message += "All destinations fetched successfully \n";
        return res.status(200).send(destinations);
        }
        catch (error) {
            message += "Error in fetching destinations \n";
            message += error + "\n";
            console.log(message);
            return res.status(400).send(message);
        }
}

exports.delete_all = async (req, res) => {
    let message = "Message ...\n";
    try {
        message += "Delete all function in destination controller\n";
        const result = await DestinationModel.deleteMany().exec();
        message += "All destinations deleted successfully \n";
        return res.status(200).send(result);
        }
        catch (error) {
            message += "Error in deleting destinations \n";
            message += error + "\n";
            console.log(message);
            return res.status(400).send(message);
        }
}

exports.search_by_name = async (req, res) => {
    let message = "Message ...\n";
    try {
        message += "Search by name function in destination controller\n";
        let name = req.query.name;
        if(!name){
            name = "@#^##%#*&";
        }
        const destinations = await DestinationModel.find({name: {$regex: name, $options: 'i'}}).exec();
        message += "Destination found successfully \n";
        return res.status(200).send(destinations);
        }
        catch (error) {
            message += "Error in searching destination \n";
            message += error + "\n";
            console.log(message);
            return res.status(400).send(message);
        }
}

exports.update = async (req, res) => {
    let message = "Message ...\n";
    try {
        message += "Update function in destination controller\n";
        const name = req.body.name;
        const description = req.body.description;
        const token = req.headers['x-access-token'];
        let images = [];
        await Promise.all(req.files.map(file => {
            return cloudinary.uploader.upload(file.path)
                .then(result => {
                    images.push(result.url);
                    message += result.url + "\n";
                    message += "File uploaded  and pushed to images successfully \n";
                    fs.unlinkSync(file.path);
                    message += "File deleted from temp successfully \n";
                })
                .catch(error => {
                    message += "Error in uploading file \n";
                    return res.status(400).send(message);
                });
        }));
        message += "All files uploaded successfully \n";
        if(!token){
            message += "Missing token \n";
            return res.status(400).send(message);
        }
        if (!name ){
            message += "Missing required fields \n";
            return res.status(400).send(message);
        }
        isDestinationExist = await DestinationModel.findOne({name: name}).exec();
        if(!isDestinationExist){
            message += "Destination not found \n";
            return res.status(400).send(message);
        }
        isDestinationExist.description = description;
        isDestinationExist.images = images;
        const result = await isDestinationExist.save();
        message += "Destination updated successfully \n";
        return res.status(200).send(result);
        }
        catch (error) {
            message += "Error in updating destination \n";
            message += error + "\n";
            console.log(message);
            return res.status(400).send(message);
        }
}






























/*
// const axios  = require('axios'); 
const DestinationModel = require('./destination');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('./cloud');
const path = multer({dest: 'uploads/'});                     

exports.register_v1 =  async (req, res, next) => {
    console.log("Try to create a destination");
    try{
        const username = req.body.username;
        const usertype = req.body.usertype;
        const password = req.body.password;

        if(!username || !password || !usertype){
            throw createHttpError.BadRequest('Missing required fields');
        }

        const isDestinationExist = await DestinationModel.findOne.username({username: username}).exec();

        if(isDestinationExist){
            throw createHttpError(400, 'Destination already exists');   
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDestination = new DestinationModel({ 
            username: username,
            password: hashedPassword
        });
        const result = await newDestination.save();
        
                

        console.log("Destination saved in database successfully!");
        res.status(201).send(result);
    }
    catch(error){
        next(error);
    }
}

exports.register = async (req, res, next) => {
    console.log("Try to create a destination");
    try{
        console.log("check point 0")
        const name = req.body.name;
        console.log("name ", req.body.name);
        console.log("body ", req.body);
        console.log(req.file.path);
        let url = ''; 
        console.log("check point 1")
        if(!name){
            res.status(400).send('Missing required fields');
            throw createHttpError.BadRequest('Missing required fields');
        }
        console.log("check point 2")
        await cloudinary.uploader.upload(req.file.path,
            function(error, result){
                if(error){
                    console.log("Error in uploading file: ", error);
                    return res.status(400).send('Error in uploading file');
                }
                console.log("File uploaded successfully");
                console.log(result);

                url = result.url;
                console.log("path:2 ", url);
                
            }
        );
        console.log("check point 3")
        console.log("path:1 ", url);
        const newDestination = new DestinationModel({ 
            name: name,
            image: `${url}`,
        });
        console.log("check point 4")
        const result = await newDestination.save();

        console.log("check point 5")
        
        
        fs.unlinkSync(req.file.path);
        console.log("check point 6")
        console.log("Destination saved in database successfully!");
        res.status(201).send(result);
        console.log("check point 7")
        
    }
    catch(error){
        console.log("error in creating a destination");
        next(error);
    }
}

exports.update = async (req, res, next) => {
    console.log("Try to update a destination");
    try{
        
        const name = req.body.name;
        console.log("name ", req.body.name);
        
        if(!name){
            
            throw createHttpError.BadRequest('Missing required fields');
        }
        const // = await DestinationModel.findByIdAndUpdate(id, {name: name}, {new: true}).exec();
        // find by name
        destination = await DestinationModel.findOne({name: name}).exec();
        if(!destination){
            throw createHttpError.NotFound('Destination not found');
        }
        // update the destination
        let url = "";
        console.log( "file path ;" + req.file.path);
        await cloudinary.uploader.upload(req.file.path,
            function(error, result){
                if(error){

                    console.log("Error in uploading file: ", error);
                    return res.status(400).send('Error in uploading file');
                }
                console.log("File uploaded successfully");
                console.log(result);

                url = result.url;
                console.log("path:2 ", url);
                
            }
        );

        destination.image = `${url}`;
        const result = await destination.save();
        fs.unlinkSync(req.file.path);
        res.status(200).send(destination);
    }
    catch(error){
        next(error);
    }
}


exports.search_by_name = async (req, res, next) => {
    console.log("Try to search a destination by name");
    try{
        let name = req.query.name;
        console.log("name ", name);
        if(!name){
            name= "@#^##%#*&"
        }
        const destination = await DestinationModel.find({name: {$regex: name, $options: 'i'}}).exec();

        if(!destination){
            throw createHttpError.NotFound('Destination not found');
        }
        res.status(200).send(destination);

        
    }
    catch(error){
        next(error);
    }
}

exports.get_all = async (req, res, next) => {
    console.log("Try to get all destinations");
    try{
        const destinations = await DestinationModel.find().exec();
        res.status(200).send(destinations);
    }
    catch(error){
        next(error);
    }
}

*/