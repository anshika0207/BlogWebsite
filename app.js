const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


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

app.get('/posts/:postname',function(req,res){
  var pname = _.lowerCase(req.params.postname);

  posts.forEach(function(post){
      var gname = _.lowerCase(post.question);

      if(pname==gname){
        res.render("post",{
          post: post,
        });
      }
  })
});
app.listen(5000, function(req,res){
  console.log("app running on port 5000");
})
