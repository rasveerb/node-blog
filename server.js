var express = require('express');
var app = express();

app.get("/", function(req, res) {
  res.send("Yay it works!");
});

app.get("/about", function(req, res){
  res.send("My name is Ras");
});

app.get("/test", function(req, res){
  res.send("This is a test page");
})

app.use(express.static('public')); //adds in images

app.listen(3000, function(){
  console.log('Server is now listening on port 3000. Ready to accept requests!');
});
