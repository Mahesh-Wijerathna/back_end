const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserModel = require('./user');


exports.register = async (req, res) => {
    let message = 'Message... \n';
    message += 'Auth register function\n';   
    
    try{
        const username = req.body.username;
        const user_type = req.body.user_type;
        const password = req.body.password;
        message += 'Username: ' + username + '\n' 
                + 'User Type: ' + user_type + '\n'
                + 'Password: ' + password + '\n';

        if(!username || !password || !user_type){
            message += 'Missing required fields\n';
            console.log(message);
            return res.status(400).send(message);
        }
        const isUserExist = await UserModel.findOne({username: username}).exec();
        if(isUserExist){
            message += 'User already exists\n';
            console.log(message);
            return res.status(400).send(message);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        message += 'Hashed Password: ' + hashedPassword + '\n';
        
        const newUser = new UserModel({
            username: username,
            user_type: user_type,
            password: hashedPassword
        });
        const result = await newUser.save();
        message += 'User saved in database successfully!\n';

        res.status(201).send(result);
        
    }
    catch(error){
        message += 'Error caught in register user in auth \n';
        message += error+ "\n";
        console.log(message);
        return res.status(500).send(message);
    }
}

exports.getUser = async (req, res) => {
    let message = 'Message... \n';
    message += 'Auth getUser function\n';
    try{
        const username = req.query.username;
        const token = req.headers['x-access-token'];
        message += 'Username: ' + username + '\n'
                + 'Token: ' + token + '\n';

        if(!username || !token){
            message += 'Missing required fields\n';
            // console.log(message);
            return res.status(400).send(message);
        }

        try{
            const decoded = jwt.verify(token, 'C3NTR@L_@UTH3NT1C@T10N');
        }
        catch {
            message += "Token is not valid\n";
            // console.log(message);
            return res.status(401).send(message);
        }

        const user = await UserModel.findOne({username: username}).exec();

        if(!user){
            message += 'User not found\n';
            // console.log(message);
            return res.status(404).send(message);
        }

        message += 'User found in database successfully!\n';

        res.status(200).send(user);

    }
    catch(error){
        message += 'Error caught in get user in auth \n';
        message += error+ "\n";
        console.log(message);
        return res.status(500).send(message);
    }
}



exports.update = async (req, res) => {
    let message = 'Message... \n';
    message += 'Auth update function\n';
    try{
        const old_username = req.query.username;
        const new_username = req.body.username;
        const new_user_type = req.body.user_type;
        const new_password = req.body.password;
        const token = req.headers['x-access-token'];



        message += 'Old Username: ' + old_username + '\n'
                + 'New Username: ' + new_username + '\n'
                + 'New User Type: ' + new_user_type + '\n'
                + 'New Password: ' + new_password + '\n'
                + 'Token: ' + token + '\n';

        if(!old_username || !new_username || !new_password || !new_user_type || !token){
            message += 'Missing required fields\n';
            // console.log(message);
            return res.status(401).send(message);
        }

        
        try{
            const decoded = jwt.verify(token, 'C3NTR@L_@UTH3NT1C@T10N');
        }
        catch {
            message += "Token is not valid\n";
            // console.log(message);
            return res.status(401).send(message);
        }

        const newUsernameAlreadyExist = await UserModel.findOne({username: new_username}).exec();
        if(newUsernameAlreadyExist && new_username != old_username){
            message += 'New username already taken\n';
            // console.log(message);
            return res.status(400).send(message);
        }

        const existUser = await UserModel.findOne({username: old_username}).exec();
        if(!existUser){
            message += 'User not found\n';
            // console.log(message);
            return res.status(404).send(message);
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);
        message += 'Hashed Password: ' + hashedPassword + '\n';

        existUser.username = new_username;
        existUser.user_type = new_user_type;
        existUser.password = hashedPassword;
        const result = await existUser.save();
        message += 'User updated in database successfully!\n';

        res.status(201).send(result);

    }
    catch(error){
        message += 'Error caught in update user in auth \n';
        message += error+ "\n";
        console.log(message);
        return res.status(500).send(message);
    }
}

exports.delete = async (req, res) => {
    let message = 'Message... \n';
    message += 'Auth delete function\n';
    try{
        const username = req.query.username;
        const token = req.headers['x-access-token'];
        message += 'Username: ' + username + '\n'
                + 'Token: ' + token + '\n';

        if(!username || !token){
            message += 'Missing required fields\n';
            // console.log(message);
            return res.status(400).send(message);
        }

        try{
            const decoded = jwt.verify(token, 'C3NTR@L_@UTH3NT1C@T10N');
        }
        catch {
            message += "Token is not valid\n";
            // console.log(message);
            return res.status(401).send(message);
        }

        const isUserExist = await UserModel.findOne({username: username}).exec();

        if(!isUserExist){
            message += 'User not found\n';
            // console.log(message);
            return res.status(404).send(message);
        }

        const result = await UserModel.deleteOne({username: username}).exec();

        message += 'User deleted from database successfully!\n';

        res.status(200).send(result);

    }
    catch(error){
        message += 'Error caught in delete user in auth \n';
        message += error+ "\n";
        console.log(message);
        return res.status(500).send(message);
    }
}

exports.login = async (req, res) => {
    let message = 'Message... \n';
    message += 'Auth login function\n';
    try{
        const username = req.body.username;
        const password = req.body.password;

        message += 'Username: ' + username + '\n'
                + 'Password: ' + password + '\n';

        if(!username || !password){
            message += 'Missing required fields\n';
            // console.log(message);
            return res.status(400).send(message);
        }

        const user = await UserModel.findOne({username: username}).exec();

        if(!user){
            message += 'User not found\n';
            // console.log(message);
            return res.status(404).send(message);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        message += "is Password Match : " + isPasswordMatch + '\n';

        if(!isPasswordMatch){
            message += 'Invalid credentials\n';
            // console.log(message);
            return res.status(401).send(message);
        }

        const accessToken = jwt.sign(
            {
                userId: user._id, 
                username: user.username,
            },
            'C3NTR@L_@UTH3NT1C@T10N',            
            {expiresIn: '14d'}
            
        );

        user.token = accessToken;
        const result = await user.save();
        message += 'User logged in successfully!\n';

        res.status(200).send(result);

    }
    catch(error){
        message += 'Error caught in login user in auth \n';
        message += error+ "\n";
        console.log(message);
        return res.status(500).send(message);
    }
}

exports.verifyToken = async (req, res) => {
    let message = 'Message... \n';
    message += 'Auth verifyToken function\n';
    try{
        const token = req.headers['x-access-token'];
        message += 'Token: ' + token + '\n';

        if (!token) {
            message += "No token, authorization denied\n";
            // console.log(message);
            return res.status(401).send(message);
        }

        try{
            const decoded = jwt.verify(token, 'C3NTR@L_@UTH3NT1C@T10N');
        }
        catch {
            message += "Token is not valid\n";
            // console.log(message);
            return res.status(401).send({ valid: false });
        }

        message += 'Decoded successfully ' +  '\n';
        res.status(200).send({ valid: true });
    }
    catch(error){
        message += 'Error caught in verifyToken in auth \n';
        message += error+ "\n";
        console.log(message);
        return res.status(500).send(message);
    }
}








        

















