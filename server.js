const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Car = require('./models/cars');
const Booking = require('./models/booking');
const port = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://thelastenvoy:envoy29@cluster1.ixeez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(res => {
    console.log('connected to db !'); 
}, (e) => {
    console.log(e); 
})

mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    
    /* here adding all these headers to avoid the cors error .  */
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type, Accept, Authorization");
    
    /*
     usually the browser first sends an options request to find out the type of
       request it can send , therefore , it will get its response here.
    */
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); 
});
 

app.post('/register', function (req, res, next) {
    console.log(req);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then((response) => {
            res.status(200).json({
                message: "Created User Successfully"
            });
        }, (e) => {
            res.status(400).json({
                message: e
            });
        });
});

app.post('/deets/:name', function (req, res, next) {
    /* the api is working perfectly now. */
    const name = req.params.name;
    Car.find({ "name": name })
        .then((response) => {
            console.log(response[0]["location"]);
            res.status(200).json(response);
        }, (e) => {
            res.status(400).json({ message: e }); 
    })
});

app.post('/login', function (req, res, next) {
    console.log(req.body); 
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    User.find({ "email": email, "password": password })
        .then((response) => {
            console.log(response.length);
            if (response.length===0) {
                res.status(400).json({ message: 'Invalid User' });    
            } else {
                res.status(200).json({ message: 'Valid User' }); 
            }
        }, (e) => {
            res.status(400).json({ message: 'Invalid User' });
        });
});

app.post('/booking',function(req,res,next){
    
    const booking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        plate_number: req.body.plate_number,
        location: req.body.location,
        car_name: req.body.name,
        rent_day: req.body.rent_day
    });
    booking.save()
        .then((response) => {
            console.log('Booking saved');
            res.status(200).json({ message: 'Booking created' });
        }, (e) => {
            res.status(400).json({ message: 'Could not register Booking' });
        });
});

app.get('/getBookings/:email', function (req, res, next) {
    console.log(req.params.email);
    const email = req.params.email;
    Booking.find({ email: email })
        .then((response) => {
            res.status(200).json(response);
        }, (e) => {
            res.status(400).json(e);
        });
});

app.listen(port, (() => {
    console.log('Server listening on port 5000');
}));



