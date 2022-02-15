const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://root:root@cluster0.cragk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

// require('./auth/auth');
// require('./model/vocabulary')

const routes = require('./routes/routes');
const userRoutes = require('./routes/user-routes');
const categoryRoutes = require('./routes/category-routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/categories', categoryRoutes);

// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(3000, () => {
    console.log('Server started.')
});
