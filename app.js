const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  res.render("index");
});

app.get("/about", function(req,res){
  res.render("about");
});

app.get('/compose',function(req,res){
  res.render("compose")
})
app.post('/compose', function(req,res){
  console.log()
})

app.listen(5000, function(req,res){
  console.log("app running on port 5000");
})
