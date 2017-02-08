'use strict';

var express = require('express');
var sqlit = require('../bin/nodesdb-sqlite3.js');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var reqA = req.body.a;
    var reqB = req.body.b;
    var resaa = parseInt(reqA)+parseInt(reqB);
    res.send({"aa":resaa});

    sqlit.connect;
    sqlit.setup;

});

module.exports = router;
