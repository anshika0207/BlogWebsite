const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



var posts = [];

app.get("/", function(req,res){
  res.render("index", {
    posts: posts
  });
});

app.get("/about", function(req,res){
  res.render("about");
});

app.get('/compose',function(req,res){
  res.render("compose")
})
app.post('/compose', function(req,res){
  var inp= req.body.inp;
  var st= req.body.st;
  var post= {
    question:inp,
    statement:st
  }
  posts.push(post);

  res.redirect("/");

})

app.listen(5000, function(req,res){
  console.log("app running on port 5000");
})
