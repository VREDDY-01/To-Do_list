const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.set("view engine","ejs");


//GET REQUESTS
app.get("/",function (req,res) {  
    const day = date.getDate();
    res.render("list",{TitleHeading:day,newListItems:items});
});
app.get("/work",function (req,res) {
    res.render("list",{TitleHeading:"Work List",newListItems:workItems});
});
app.get("/about",function (req,res) {
    res.render("about");
});


//POST REQUESTS
app.post("/",function (req,res) {
    const item = req.body.newItem;
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});



app.listen(3000,function () {
    console.log("Server has started at port 3000");
});