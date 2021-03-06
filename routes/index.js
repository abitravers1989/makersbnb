var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');
var Property = require('../models/property');

mongoose.connect('mongodb://localhost/makersbnb_test');

var theUser;

router.get('/', function (req, res) {
  res.render('firstpage');
});

router.post('/', function (req, res) {
  User.findOne({username: req.body.username, password: req.body.password}, function (err, userexist){
   if (err) {
     console.log(err);
   };
   if (!userexist) {
     res.render('login-failure')
   } else {
     res.render('firstpage-success', {data: userexist})
     theUser = userexist
   };
});
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.post('/signupcomplete', function (req, res) {
  User(req.body).save(function(err,data){
    console.log(data);
    if (err) throw err;
  });
  res.redirect('/');
});

router.get('/addproperty', function (req, res) {
  var current_user = null;
  if (typeof theUser !== 'undefined'){
    current_user = theUser
    res.render('addproperty', {'current_user': current_user});
  } else {
     res.render('login-to-add')
   };
});

router.post('/addproperty', function (req, res) {
  // get data from view and add it to mongo db
  Property(req.body).save(function(err,data){
    console.log(data);
    if (err) throw err;
  })
  res.redirect('/propertylist');
});

router.get('/propertylist', function (req, res) {
  // if (typeof theUser !== 'undefined'){
  //   Property.find({}, function(err, propAll){
  //     console.log(propAll);
  //     if (err) throw err;
  //   res.render('propertylist', {'propAll': propAll});
  // }
  // else {
  //   Property.find({}, function(err, propAll){
  //     console.log(propAll);
  //     if (err) throw err;
  //   res.render('propertylist1', {'propAll': propAll});
  //  };
  Property.find({}, function(err, propAll){
    console.log(propAll);
    if (err) throw err;
  res.render('propertylist', {'propAll': propAll});
  });


});


router.post('/bookproperty', function (req, res) {
  bookingID = req.body.houseid
  res.render('bookproperty');//, {'blah': blah});
});

module.exports = router;
