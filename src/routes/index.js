var express = require('express');
var router = express.Router();
require('dotenv').config({path:'../.env'});

const API_HOST = process.env.API_HOST;
const API_PORT = process.env.API_PORT

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express', API_HOST: API_HOST, API_PORT:API_PORT });
});

module.exports = router;