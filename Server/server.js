const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const router = express.Router();
const fs = require('fs');
const path = require("path")
const FILE_PATH = path.join(__dirname,'..','ngApp/src/app/Data', 'products.json');

const PORT = 3000

const app = express();
app.use(cors());

function ReadFile() {
    let filePath = path.join(__dirname,'..','ngApp/src/app/Images', 'images.jpg');
    let data = fs.readFileSync(filePath);
    let extensionName = path.extname(filePath);
    let base64Image = Buffer.from(data,'binary').toString('base64');
    let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
    return imgSrcString;
}
function WriteFile(base64Data, typeOfData, fileName = "images-1.jpg") {
    let imgData = base64Data.replace("data:" + typeOfData + ";base64,", "")
    return fs.writeFileSync(path.join(__dirname,'..','ngApp/src/app/Images', fileName),imgData,"base64");
}
app.use(bodyParser.json());

app.post("/postData",(req, res) => {
    WriteFile(req.body.base64Data,req.body.type, req.body.fileName);
    req.body.base64Data = "";
    let userData = JSON.stringify(req.body);
    fs.writeFileSync(FILE_PATH, userData,{encoding: 'utf-8'});
    res.status(200).send({products: req.body.products});
});

app.get("/",function(request, response) {
    let data = ReadFile();
    response.send({abc:"Hello from server",data});
});

app.post("/writeImage",(req, res) => {
    let base64Data = req.body.base64Data;
    let typeOfData = req.body.type;
    WriteFile(base64Data, typeOfData);
    res.status(200).send({success: save});
});

app.listen(PORT, () => {
    console.log("app is running");
})