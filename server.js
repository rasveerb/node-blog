var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

var postsArray = [];
var dataObject = {};


//adds in all static content in public folder
app.use(express.static('public'));
//routes specific image to a specific path
app.use("/frank",express.static('public/quitefrankly logo.png'));

app.use(formidable());

//serves the html page when you hit localhost
app.get("/", function(req,res){
  res.sendFile(process.cwd() + "/public/index.html");
});

app.get("/about", function(req, res){
  res.send("My name is Ras");
});

//POST method
app.post("/create-post", function(req,res){

  dataObject = {"timestamp" : req.fields.blogpost};
  postsArray.push(dataObject);

  // for(i=0;i<postsArray.length;i++){
  //   console.log("in for loop", i);
  fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(postsArray), function(error){ //maybe try append file and read out an array somehow
    if(error) throw(error);
  });

  // }

  // console.log("submitted post", req.fields);
  console.log("posts array inside ", postsArray);

});




  // fs.readFile(__dirname + '/data/posts.json', function(error,file){
  //   var parsedFile = JSON.parse(file);
  //   console.log("read file inside POST: " ,parsedFile);
  // });

  // console.log("submitted post", req.fields);
  console.log("posts array outside ", postsArray);


//TODO write the array to the posts.json

//TODO change the blogpost to include the Date.now() as the key and post as the value

// //method which writes data to the hard drive - NEED TO REFACTOR
// fs.writeFile(__dirname + '/data/posts.json',JSON.stringify({"2020210": "test blog post"}, null, 2), function(error){ //__dirname = global node object - gives path to current working directory
//   if(error) throw (error);
// });
//
// //method which reads data that's already there
// fs.readFile(__dirname + '/data/posts.json', function(error,file){
//   var parsedFile = JSON.parse(file);
//   console.log("read file: " ,parsedFile);
// });

app.listen(3000, function(){
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
