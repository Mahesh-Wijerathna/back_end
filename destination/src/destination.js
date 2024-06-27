const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : false
    },
    images: {
        type: [String],
        required: false
    }
});

const DestinationModel = mongoose.model('Destination', DestinationSchema);

module.exports = DestinationModel;