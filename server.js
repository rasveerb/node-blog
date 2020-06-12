//TODO get all recent posts to show as soon as you click submit
//TODO research if refactoring with appendFile is better or not
var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

var postsArray = [];
var dataObject = {};

//adds in all static content in public folder
app.use(express.static('public'));
//routes specific image to a specific path
app.use("/frank", express.static('public/quitefrankly logo.png'));

app.use(formidable());

//serves the html page when you hit localhost
app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.get("/about", function(req, res) {
  res.send("My name is Ras");
});

//POST method
app.post("/create-post", function(req, res) {

  dataObject = {
    [Date.now()]: req.fields.blogpost
  };

//Array of blog posts
  postsArray.push(dataObject);

  fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(postsArray), function(error) { //maybe try append file and read out an array somehow
    if (error) throw (error);
  });

  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    var parsedFile = JSON.parse(file);
    console.log("read file inside POST: ", parsedFile);
  });

});

// //method which reads data that's already there
fs.readFile(__dirname + '/data/posts.json', function(error, file) {
  var parsedFile = JSON.parse(file);
  console.log("read file: ", parsedFile);
});

app.listen(3000, function() {
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
