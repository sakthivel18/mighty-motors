const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const tradeRoutes = require('./routes/tradeRoutes');


const app = express();
const port = 5000;
const host = 'localhost';

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use('/trades', tradeRoutes);

app.listen(port, host, () => {
    console.log('Server started and listening on port ' + port);
});