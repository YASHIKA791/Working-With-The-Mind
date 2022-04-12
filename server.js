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
const aboutContent = "The examination process at student life has an inverse association with mental wellbeing and academic performance. Examinations are considered events of dread for most students in Bangladesh, at all levels including the undergraduate level. One of the contributory factors could be the rank based academic competition among peers enforced by the system. It is expected to be associated with several socioeconomic factors, such as social dogma of establishment, lack of permanent jobs, delay in certification, and excessive competition in entry-level positions. Considering Bangladesh is a low-middle income country, youths often are faced with the stress of creating an identity and generating income at an early age. It forces them to take examinations seriously which would determine the progression of their career. This is where, we postulate, mental health of students are affected emotionally, psychologically and socially due to this pressure. According to Dasgupta (2013), there are two important segments of mental health: psychological, where mental health develops due to the pressure of expectation and adjustment to the environment to survive, and social, where biology, psychology, and society all affect individual mental health. Societal norms influence the adaptive or maladaptive behavior of the individual. Mental health problems are public health concerns that often ignite risky behaviors among youths, such as suicide among university students or resorting to addictive substances. However, there remains a literature gap in Bangladesh on this issue. This paper intends to contribute to it by investigating the prevalence of anxiety and depression originating from examination pressure. The data of this study would be collected from students of Dhaka University English Department who had undergone the undergraduate examinations with the objective of identifying possible predictors related to student's socio-demographic and academic status. Qualitative methodologies would be used to analyze the data, which includes lexical diversity, text-preprocessing, constructing a corpus, and token objects. Possible quantitative analysis, such as mixed effects models, would be used for the categorized anxiety scores and fitting to demographic information to measure the correlation between exam anxiety and depression severity status among students..";
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
