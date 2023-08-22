const express = require('express');
const app = express();
const port = 8000;

const fs = require('fs');
const path = require('path');

//mongo
const db = require('./config/mongoose');

//use post req parser
app.use(express.urlencoded({ extended: true }));

//use express router to routes/
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Could not start the server: ${err}`);
        return;
    }

    console.log(`Server is started on port: ${port}`);
});