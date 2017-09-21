const express = require("express");
const app = express();
const port = 3001;

app.get("/", function(req, resp){
    resp.sendFile(__dirname+"/public/index.html");
});

app.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log("Port is running");
})