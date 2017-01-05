var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var startingNumberCounter=0;
var raceTime=0;
var running=false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/startingBlock', function(req,res)
{
  console.log("call testing");
  console.log(req.body);
  res.json(req.body);

});

console.log("Server is listening");

app.listen(9021);
