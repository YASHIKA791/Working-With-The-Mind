const express = require("express");

const server = express();
const ejs = require("ejs");
const _ = require("lodash");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));
const homeStartingContent ="Depression is a serious mental health condition which can affect day to day functioning of an individual. Depression is different from sadness which can have a long-term effect on the day to day activities of the person. When depressed every task may seem challenging. Other than professional help, it is important to make certain changes in your day to day activities too. These small steps can improve your overall mood and mental health. From diet to lifestyle changes, several modifications can help manage depression symptoms. Constant motivation plays an important role in fighting depression. Here are some self-help tips which can assist in fighting depression effectively.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
 
});
// =================== =============================


const Post = mongoose.model("Post", postSchema);

server.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});
server.get("/sign-in",function(req,res){
  res.render("signin");
});
server.get("/sign-up",function(req,res){
  res.render("signup");
});

server.get("/compose", function(req, res){
  res.render("compose");
});

server.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

server.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content,
      
    });
  });

});

server.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

server.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


server.listen(3000, function() {
  console.log("Server started on port 3000");
});
