const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const offerRoutes = require('./routes/offerRoutes');
const MongoStore = require('connect-mongo');

const app = express();
const port = 5000;
const host = 'localhost';

const corsOptions ={
    origin: 'http://localhost:3000', 
    credentials: true,            
    optionSuccessStatus: 200,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    headers: ['Content-Type']
}

app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb://localhost:27017/mighty_motors', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(port, host, () => {
        console.log('Server started and listening on port ' + port);
    });
}).catch(err =>  console.log(err.message));


  app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/mighty_motors'}),
        cookie: {secure: false, maxAge: 60*60*1000}
        })
);
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

app.use(morgan('tiny'));
app.use('/user', userRoutes);
app.use('/trades', tradeRoutes);
app.use('/offer', offerRoutes);


