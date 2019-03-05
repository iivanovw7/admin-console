const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId

});

module.exports = mongoose.model('Client', clientSchema, 'clients');

