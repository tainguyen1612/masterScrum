const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const UserRoute = require('./routes/index');
const cors = require('cors');

mongoose.connect('mongodb+srv://duyenso123:duyenso123@cluster0.x64sp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
});

db.once('open', () => {
    console.log("DB Connection Success");
});

const app = express();
app.use(cookieParser());
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3333 ;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

//get login
app.get('/login', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'login.html'))
})

app.use(UserRoute);

