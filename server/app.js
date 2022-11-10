const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const tradeRoutes = require('./routes/tradeRoutes');


const app = express();
const port = 5000;
const host = 'localhost';

mongoose.connect('mongodb://localhost:27017/mighty_motors')
.then(() => {
    app.listen(port, host, () => {
        console.log('Server started and listening on port ' + port);
    });
}).catch(err =>  console.log(err.message));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
  });
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/trades', tradeRoutes);


