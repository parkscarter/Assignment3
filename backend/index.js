var express = require("express");
var cors = require("cors");
var ObjectId = require('mongodb').ObjectId;
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));



const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listenting at http://%s:%s\n", host, port);
});



const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);



app.post("/add_product", async (req, res) => {
    await client.connect();
    console.log("Request: /add_product");
        
    const newProduct = req.body; 
    const query = {
        title: newProduct.title,
        price: Number(newProduct.price),
        description: newProduct.description,
        category: newProduct.category,
        image: newProduct.image,
        rating: {
            rate: Number(newProduct.rating.rate),
            count: Number(newProduct.rating.count)
        }
    }
    const result = await db.collection("fakestore_catalog").insertOne(query);
        
    if(!result) {
        res.send("Product was not added").status(404);
    }
            
    else {
        res.status(201).send(result);
    }
});



app.get("/fakestore_catalog", async (req, res) => {
    await client.connect();
    console.log("Request: /fakestore_catalog");
    
    const query = {};
    const results = await db.collection("fakestore_catalog").find(query).toArray();
    console.log("ALL Items: ", results);
    
    res.status(200);
    res.send(results);
});


app.put("/change_product", async (req, res) => {
    await client.connect();
    console.log("Request: /change_product");
        
    const updateProduct = req.body; 
    const updateID = updateProduct._id;
    const query = {
        title: updateProduct.title,
        price: Number(updateProduct.price),
        description: updateProduct.description,
        category: updateProduct.category,
        image: updateProduct.image,
        rating: {
            rate: Number(updateProduct.rating.rate),
            count: Number(updateProduct.rating.count)
        }
    }
    const result = await db.collection("fakestore_catalog").updateOne({_id: new ObjectId(updateID)}, {"$set": query});

    console.log(result);
        
    if(!result) {
        res.send("Product was not updated").status(404);
    }
            
    else {
        res.status(201).send(result);
    }
});


   app.delete("/delete_product", async (req, res) => {
    await client.connect();
    console.log("Request: /delete_product");
    
    const deleteProduct = req.body; 
    const deleteID = deleteProduct._id;

    console.log(deleteID)

    const query = {_id: new ObjectId(deleteID)};
    const result = await db.collection("fakestore_catalog").deleteOne(query);
    console.log("DELETE Item: ", result);
    
    res.status(200);
    res.send(result);
});