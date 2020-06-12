//TODO get all recent posts to show as soon as you click submit
var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

var postsArray = [];
var dataObject = {};
const timestamp = Date.now();


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

  //TODO change the blogpost to include the Date.now() as the key and post as the value
  console.log("timestamp: ", timestamp);

  dataObject = {
    [timestamp]: req.fields.blogpost
  };

  console.log("data object: ", dataObject);

  postsArray.push(dataObject);

  fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(postsArray), function(error) { //maybe try append file and read out an array somehow
    if (error) throw (error);
  });

  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    var parsedFile = JSON.parse(file);
    console.log("read file inside POST: ", parsedFile);
  });

});

// //method which writes data to the hard drive - NEED TO REFACTOR
// fs.writeFile(__dirname + '/data/posts.json',JSON.stringify({"2020210": "test blog post"}, null, 2), function(error){ //__dirname = global node object - gives path to current working directory
//   if(error) throw (error);
// });
//
// //method which reads data that's already there
fs.readFile(__dirname + '/data/posts.json', function(error, file) {
  var parsedFile = JSON.parse(file);
  console.log("read file: ", parsedFile);
});

app.listen(3000, function() {
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
