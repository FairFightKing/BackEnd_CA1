// Dependencies
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
// Mongo
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://FFKing:CD2CK55yScXVzij@cluster0.vypn2.mongodb.net/CardsDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});

// DB INFOS
const port = 3000;
const dbName = "CardsDB";
const colName = "Hearthstone";
let collection;
// we run our app which func is written at the end of the file
run();
// HomePage
app.get('/', (req,res) => {
    res.send('Please use /hs thanks.')
})
// READ
app.get('/hs', (req, res)  => {
    if(req.body.id) {
        async function getCard() {
            try{
                let cardData = await collection.findOne({"_id": ObjectId(req.body.id)})
                res.json(cardData).status(200)
            } catch{
                res.send('Could not find specified ID').status(400)
            }
        }
        getCard();
    } else {
        async function getCards () {
            let CardsData = await collection.find().toArray()
            res.json(CardsData).status(200)
        }
        getCards();
    }

})
// CREATE
app.post('/hs', (req, res) => {
    let NewCard = new HsCard(req.body.Name,req.body.Mana,req.body.Golden,req.body.Attack,req.body.HP,req.body.Keyword)
    collection.insertOne(NewCard).then(() => res.status(200)).catch(() => res.status(400));
})
// UPDATE
app.put('/hs', (req, res) => {
    let card;
    async function findCard(){
        card = await collection.findOne({"_id": ObjectId(req.body.id)})
        if(card !== null){
            let UpdateCard = new HsCard(
                req.body.Name ? req.body.Name : card.Name,
                req.body.Mana ? req.body.Mana : card.Mana,
                req.body.Golden ? req.body.Golden : card.Golden,
                req.body.Attack ? req.body.Attack : card.Attack,
                req.body.HP ? req.body.HP : card.HP,
                req.body.Keyword ? req.body.Keyword : card.Keyword,
            )
            try {
                await collection.updateOne({"_id": ObjectId(req.body.id)},{$set:UpdateCard})
                res.status(200).send('Update Successful')
            } catch (e) {
                res.send('Update Failed But card found').status(400)
            }
        } else{
            res.send('card not found,no matching id').status(400)
        }
    }
    findCard();
})

// connection to DB
async function run(){
    try {
        await client.connect(() => {
            collection = client.db(dbName).collection(colName);
            app.listen(port);
            console.log(`listening on ${port}.`)
        })
    } catch (e) {
        console.log(e)
    }
}

class HsCard{
    Name;
    Mana;
    Golden;
    HP;
    Keyword;
    Attack;
    constructor(Name,Mana,Golden = false, Attack,HP,Keyword = 'none') {
        this.Name = Name;
        this.Mana = Mana;
        this.Golden = Golden;
        this.Attack = Attack;
        this.HP = HP;
        this.Keyword = Keyword;
    }
}