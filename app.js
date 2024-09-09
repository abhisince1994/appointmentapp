const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const appointmentRoutes = require('./routes/appointment');
const path = require('path');

const app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(appointmentRoutes);

//404n page
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found'});
});

// Syncing sequelise models and starting the server
sequelize
.sync()
.then(result => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(err => {
    console.log(err);
});