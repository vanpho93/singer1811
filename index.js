const express = require('express');
const fs = require('fs');
const reload = require('reload');

const Singer = require('./db');
const uploadConfig = require('./uploadConfig');

const uploadSingle = uploadConfig.single('image');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/singer'));

app.get('/singer', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singer', { singers }));
});

app.get('/add', (req, res) => res.render('add'));

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    Singer.findByIdAndRemove(id)
    .then(singer => {
        fs.unlinkSync(`./public/${singer.image}`);
        res.redirect('/singer');
    })
    .catch(err => res.send(err));
});

app.get('/update/:id', (req, res) => {
    Singer.findById(req.params.id)
    .then(singer => res.render('update', { singer }))
    .catch(err => res.send(err));
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    uploadSingle(req, res, err => {
        if (err) return res.send(err);
        const { name } = req.body;
        const updateObj = req.file ? { name, image: req.file.filename } : { name };
        Singer.findByIdAndUpdate(id, updateObj)
        .then(singer => {
            if (req.file) fs.unlinkSync(`./public/${singer.image}`);
            res.redirect('/singer');
        })
        .catch(err => res.send(err));
    });
});

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
