const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    reviewer: { type: String, required: true },
    review: { type: String, required: true}
});

const shoppeSchema = mongoose.Schema({
    shoppeName: { type: String, required: true },
    location: { type: String, required: true },
    shoppeKeeper: { type: String, required: true },
    shoppePhoto: { type: String},
    reviews: { type: [reviewSchema]}
});

const Shoppe = mongoose.model('Shoppe', shoppeSchema);

module.exports = Shoppe;