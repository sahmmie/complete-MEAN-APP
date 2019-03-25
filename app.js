const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();

mongoose.connect(config.database, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('database error ' + err);
})

const users = require('./routes/users')

const port = 3000

// cors middleware 
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname, 'public')));
// body parser
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

app.get('/', (req, res) => {
    res.status(202).send('I work');
})

app.listen(port, () => {
    console.log('Server started at port ' + port);
});