const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
var dataArray = [];

app.use(express.static("node_modules"));
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res)=>{
    app.set("view engine", "ejs")
    res.render("index")
})

app.get("/todo", (req, res)=>{
    app.set("view engine","ejs")
    res.render("todo")
})

app.get("/todo/:textVal",(req, res)=>{
    dataArray.push(req.params.textVal)
    console.log(dataArray)
    res.send("Succesfully stored your Chore!")
    //take the value of query string and store it in a list
})

app.get("/tasker",(req, res)=>{
    app.set("view engine","ejs")
    res.render("storage", {dataArray:dataArray})
})

app.get("/delete",(req, res)=>{
    app.set("view engine","ejs")
    res.render("delete")
})


app.get("/delete/:element",(req, res)=>{
    let removeVal = req.params.element;
    let eleIdx = dataArray.indexOf(removeVal)
    dataArray.splice(eleIdx,1)
})

app.get("/update/:element/:element1",(req,res)=>{
    let updated = req.params.element;
    let notUpdated = req.params.element1;
    let idx = dataArray.indexOf(notUpdated);
    dataArray[idx] = updated;
    res.send("Updated")
})


app.listen(3000);