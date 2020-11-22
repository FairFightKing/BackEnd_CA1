// Dependencies
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
// Mongo
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://FFKing:CD2CK55yScXVzij@cluster0.vypn2.mongodb.net/CardsDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
// DB INFOS
const port = 3000;
const dbName = "CardsDB";


// We listen on port 3000
app.listen(port, function() {
    console.log(`listening on ${port}`);
});