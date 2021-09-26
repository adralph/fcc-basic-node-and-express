var express = require('express');
var app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

function getTheCurrentTimeString() {
    return new Date().toString();
}
app.use('/', bodyParser.urlencoded({extended: false}));
app.get('/name', function(req,res){
    res.json({name: req.query.first+' '+req.query.last})
});
app.get('/:word/echo', function(req,res){
    res.json({echo: req.params.word})
});
app.use('/', function(req,res,next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});
app.get('/now', function(req, res, next){
    req.time = getTheCurrentTimeString();
    next();
}, function(req,res){
    res.json({time: req.time});
});
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/json',function(req, res){
    console.log(process.env.MESSAGE_STYLE);
    if(process.env.MESSAGE_STYLE == "uppercase"){
        res.json({"message": "HELLO JSON"});
    }
    else{
        res.json({"message": "Hello json"});
    }
});
app.use('/public', express.static(__dirname+'/public'));
app.post('/name', bodyParser.urlencoded({extended: false}), function(req,res){
    res.json({name: req.body.first+' '+req.body.last});
});
console.log('Hello World');
module.exports = app;
