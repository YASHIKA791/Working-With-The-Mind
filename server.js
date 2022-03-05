const express = require("express");

const server = express();




// ================================================


server.get("/login", function (req, res) {
    res.render('/login');
})

server.get("/sign-up", function (req, res) {
    res.sendFile(__dirname+'/signup.html');
})






server.listen(3000, function() {
  console.log("Server started on port 3000");
});