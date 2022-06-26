const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

app.use(express.json());

const subscriberRouter = require('./routes/index');

app.use('/subscriber', subscriberRouter);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server`);
    }
    console.log(`Server is running on port : ${port}`)
})