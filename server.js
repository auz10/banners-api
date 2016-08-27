var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promo = require('./app/models/promo');

mongoose.connect('mongodb://localhost/banners');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;

var router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(function(req, res, next) {
    console.log('req')
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'sup API' });
});

router.route('/promos')
    .post(function(req, res) {
        var promo = new Promo({ 
            promoKey: req.body.promoKey,
            imagePath: req.body.imagePath,
            name: req.body.name,
            channel: req.body.channel.split('/'),
            head: req.body.head,
            sell: req.body.sell,
            cta: req.body.cta,
            url: req.body.url,
            promoType: req.body.promoType
        });

        promo.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Promo saved!' })
        });
    })  
    .get(function(req, res) {
        Promo.find(function(err, promos) {
            if (err)
                res.send(err);
            res.json(promos)
        })
    });

router.route('/promos/:promo_id')
    .get(function(req, res) {
        Promo.find({ promoKey: req.params.promo_id }, function(err, promo) {
            if (err)
                res.send(err);
            res.json(promo)
        })
    })
    .put(function(req, res) {
        Promo.findById(req.params.promo_id, function(err, promo) {
            if (err)
                res.send(err);
            
            promo.promoKey = req.body.promoKey
            promo.imagePath = req.body.imagePath
            promo.name = req.body.name
            promo.channel = req.body.channel.split('/')
            promo.head = req.body.head,
            promo.sell = req.body.sell
            promo.cta = req.body.cta
            promo.url = req.body.url
            promoType = req.body.promoType

            promo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Promo updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Promo.remove({
            _id: req.params.promo_id
        }, function(err, promo) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted!' });
        })
    });

app.use('/api', router);

app.listen(port);
console.log('Started on port ' + port);