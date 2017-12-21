const express = require('express');
const reload = require('reload');
const Singer = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/singer'));

app.get('/singer', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singer', { singers }));
});

app.get('/add', (req, res) => res.render('add'));

app.post('/singer', (req, res) => {

});

app.listen(3000, () => console.log('Server started'));

reload(app);

/*
db.getCollection('singers').insertMany([
    { name: 'Bao Thy', image: '1.jpg' },
    { name: 'Soobin', image: '2.jpg' },
])
*/
