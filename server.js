var express = require('express');
var app = express();

//routes specific image to a specific path
app.use("/frank",express.static('public/quitefrankly logo.png'));

//adds in all static content in public folder
app.use(express.static('public'));

//serves the html page when you hit localhost
app.get("/", function(req,res){
  res.sendFile(process.cwd() + "/public/index.html");
});
//POST method
app.post("/create-post", function(req,res){
  console.log("/create-post");
})

app.get("/about", function(req, res){
  res.send("My name is Ras");
});

app.listen(3000, function(){
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
