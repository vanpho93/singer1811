const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean1811', { useMongoClient: true })
.then(() => console.log('Connected'))
.catch(err => console.log(err.message));

const singerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    image: { type: String, required: true, trim: true },
});

const Singer = mongoose.model('Singer', singerSchema);

module.exports = Singer;
