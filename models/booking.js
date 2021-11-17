const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    date: String,
    time:String,
    plate_number: String,
    location: String,
    car_name: String,
    rent_day: String,
});

module.exports = mongoose.model('Booking', bookingSchema); 