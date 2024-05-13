const mongoose = require('mongoose');

const shoppeSchema = mongoose.Schema({
  shoppeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  shoppeKeeper: {
    type: String,
    required: true,
  }
});

const shoppe = mongoose.model('User', shoppeSchema);

module.exports = shoppe;