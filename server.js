var express = require('express');
var app = express();

//POST method
app.get("/create-post", function(req,res){
  res.send("blogpost page");
})

app.post("/create-post", function(req,res){
  console.log("/create-post");
})

app.get("/", function(req, res) {
  res.send("Yay it works!");
});

app.get("/about", function(req, res){
  res.send("My name is Ras");
});

//routes specific image to a specific path
app.use("/frank",express.static('public/quitefrankly logo.png'));

//adds in all static content in public folder
app.use(express.static('public'));

app.listen(3000, function(){
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
