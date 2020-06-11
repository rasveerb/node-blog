var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

//adds in all static content in public folder
app.use(express.static('public'));
//routes specific image to a specific path
app.use("/frank",express.static('public/quitefrankly logo.png'));

app.use(formidable());

//serves the html page when you hit localhost
app.get("/", function(req,res){
  res.sendFile(process.cwd() + "/public/index.html");
});

//POST method
app.post("/create-post", function(req,res){
  console.log(req.fields);
});

// //method which writes data to the hard drive - NEED TO REFACTOR
fs.writeFile(__dirname + '/data/posts.json',JSON.stringify(blogpost = {"2020210": "test content"}, null, 2), function(error){ //__dirname = global node object - gives path to current working directory
  if(error) throw (error);
});

//method which reads data that's already there
fs.readFile(__dirname + '/data/posts.json', function(error,file){
  var parsedFile = JSON.parse(file);
  console.log(parsedFile);
});

app.get("/about", function(req, res){
  res.send("My name is Ras");
});

app.listen(3000, function(){
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
