require('dotenv').config()
const bodyParser = require('body-parser');

let express = require('express');
let app = express();

//meet the node console
console.log("Hello World");

//start a working express server
app.get("/", function(req, res) {
  res.send("Hello Express");
});

//serve an html file
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//serve static assets
app.use("/public", express.static(__dirname + "/public"));

//serve json on a specific route
app.get("/json", function(req, res) {
  res.json({
    message: "Hello json"
  });
});

//use .env file
app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({message: "HELLO JSON"});
  } else {
    res.json({message: "Hello json"});
  }
});

//implement a root-level request logger middleware
app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//chain middleware to create a time server
app.get('/now',function(req,res,next) {
  req.time=new Date().toString();
  next();
}, function(req,res){
  res.send({time: req.time});
});

//get route parameter input from client
app.get("/:word/echo", function(req, res) {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

//get query parameter input from client
app.route('/name')
  .get(function(req, res) {
    const { first: firstName, last: lastName } = req.query
    const name = firstName + ' ' + lastName
    res.json({ name })
  })
  .post(function(req, res) {
    const { first: firstName, last: lastName } = req.body
    const name = firstName + ' ' + lastName
    res.json({ name })
  })

//use body-parser to parse post requests
const urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

//get data from post requests
app.post('/name', function(req, res) {
    const { first: firstName, last: lastName } = req.body
    const name = firstName + ' ' + lastName
    res.json({ name })
})





 module.exports = app;
