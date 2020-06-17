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

  postsArray.push(dataObject);

  fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(postsArray), function(error) {
    if (error) throw (error);
  });

  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    var parsedFile = JSON.parse(file);
  });

  res.json({ posts: postsArray}); //TODO need to change to a sucessful submission page - not sure if todo is needed with step 10
//TODO make the above line into a pop up maybe??
});

//links to script.js to show recent posts
//TODO get it to show recent posts
//TODO get it to only call logo and title part once and append recent posts
app.get("/get-posts", function(req, res){
  res.sendFile(process.cwd() + "/data/posts.json");

  // console.log("scripts debugger: " + "/data/posts.json");
});

app.listen(3000, function() {
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
