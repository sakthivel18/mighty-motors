const express = require('express');
const morgan = require('morgan');
const tradeRoutes = require('./routes/tradeRoutes');


const app = express();
const port = 5000;
const host = 'localhost';

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', function (req, res) {
  res.status(200).json({'message': 'hello world'});
});

app.use('/trades', tradeRoutes);

app.listen(port, host, () => {
    console.log('Server started and listening on port ' + port);
});