const express = require('express');
const reload = require('reload');
const Singer = require('./db');
const uploadConfig = require('./uploadConfig');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/singer'));

app.get('/singer', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singer', { singers }));
});

app.get('/add', (req, res) => res.render('add'));

const uploadSingle = uploadConfig.single('image');

app.post('/singer', (req, res) => {
    uploadSingle(req, res, err => {
        if (err) return res.send(err);
        const singer = new Singer({ name: req.body.name, image: req.file.filename })
        singer.save()
        .then(() => res.redirect('/singer'))
        .catch(err => res.send(err));
    });
});

app.listen(3000, () => console.log('Server started'));

reload(app);



/*
1. Save hinh, lay duoc ten hinh, ten singer
2. Add singer vao database ->
    const singer = new Singer({  }); singer.save() -> Promise
*/
