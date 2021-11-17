const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    plate_number: String,
    location: String,
    rent_dat: String,
    available: Boolean,
});

module.exports = mongoose.model('Car', carSchema); 