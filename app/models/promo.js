var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promoSchema = new Schema ({
    promoKey: String,
    imagePath: String,
    name: String,
    channel: Array,
    head: String,
    sell: String,
    cta: String,
    url: String,
    promoType: String
});

module.exports = mongoose.model('Promo', promoSchema);
