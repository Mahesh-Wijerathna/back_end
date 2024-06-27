const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
username: {
    type: String,
    required: false,
    
},
user_type : {
    type : String,
    required : false
},
password: {
    type: String,
    required: false
},
token : {
    type : String,
    required : false
}
});




module.exports = mongoose.model('User', UserSchema);