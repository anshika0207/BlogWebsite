const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/journalDB', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const entrySchema = new mongoose.Schema({
  title: String,
  content: String
})

const Entry = mongoose.model('Entry', entrySchema);

const initial = new Entry({
  title: "Day 3",
  content:"Integer eget massa ut ex hendrerit dictum. Curabitur eget nibh in dui consectetur vestibulum eget ut dolor. Aliquam ac nunc tristique, condimentum eros at, varius mi. Maecenas suscipit sem id arcu lacinia fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum eget suscipit purus, eu laoreet ex. Sed ac orci elit. Nunc suscipit turpis eget lorem mattis, eu dapibus mi luctus. Vivamus volutpat convallis quam id tempor. Phasellus facilisis blandit leo at faucibus. Vivamus commodo diam a elit mattis, a aliquet neque egestas. Nulla ac mattis est. Vivamus nec aliquet risus. Sed interdum mattis sem id bibendum."
})

// initial.save();

app.get("/", function(req,res){

  Entry.find({},function(err, entries){
    if(err){
      console.log(err);
    }
    else{
        res.render("index", {entries});
    }
  })

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

  var newEntry = new Entry({
    title: inp,
    content: st
  })

  newEntry.save();
  res.redirect("/");

})

app.get('/posts/:postname',function(req,res){
  var pname = _.lowerCase(req.params.postname);
Entry.find({},function(err, entries){
  if(err){
    console.log(err);
  }
  else{
    entries.forEach(function(entry){
      var gname = _.lowerCase(entry.title);
      if(pname==gname){
        res.render("post",{
          post: entry,
        });
      }
    })
  }
})
});
app.listen(5000, function(req,res){
  console.log("app running on port 5000");
})
