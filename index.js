const express = require('express');
const app = express();
const port = 8000;

const fs = require('fs');
const path = require('path');
const cors = require('cors');

//mongo
const db = require('./config/mongoose');

//use post req parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//use express router to routes/
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Could not start the server: ${err}`);
        return;
    }

    console.log(`Server is started on port: ${port}`);
});