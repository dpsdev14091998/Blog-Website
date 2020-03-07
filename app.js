//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey, I am Dev from IIIT Bhubaneswar of Computer Engineering branch. This is a blog site demo. I have used HTML ,CSS, Bootstrap, Nodejs and creating EJS files and rendering it through the main file.";
const aboutContent = "Hey, I am Dev from IIIT Bhubaneswar of Computer Engineering branch. This is a blog site demo. I have used HTML ,CSS, Bootstrap, Nodejs and creating EJS files and rendering it through the main file.";
const contactContent = "Hey, I am Dev from IIIT Bhubaneswar of Computer Engineering branch. This is a blog site demo. I have used HTML ,CSS, Bootstrap, Nodejs and creating EJS files and rendering it through the main file.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get("/",function(req,res){
  res.render("home", {startingContent: homeStartingContent, posts:posts});

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  // console.log(req.params.postName);
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle){
      // console.log("Match Found!");
      res.render("post",{title: post.title , content: post.content});
    } else{
      // console.log("Not a Match");
    }

  });
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
