const express = require("express");

const server = express();

server.use(express.static('public'))


// ================================================


server.get("/sign-in", function (req, res) {
    res.sendFile(__dirname+'/signin.html');
})

server.get("/sign-up", function (req, res) {
    res.sendFile(__dirname+'/signup.html');
})






server.listen(3000, function() {
  console.log("Server started on port 3000");
});