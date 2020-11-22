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
    res.status(200).send('Please use /hs thanks.')
})
// READ
app.get('/hs', (req, res)  => {
    if(req.body.id) {
        async function getCard() {
            let cardData = await collection.findOne({"_id": ObjectId(req.body.id)})
            if (cardData) {
                res.status(200).json(cardData)
            } else {
                res.status(400).send('Could not find specified ID')
            }
        }
        getCard();
    } else {
        async function getCards () {
            let CardsData = await collection.find().toArray()
            res.status(200).json(CardsData)
        }
        getCards();
    }

})
// CREATE
app.post('/hs', (req, res) => {
    if(req.body.Name && req.body.Mana && req.body.Attack && req.body.HP){
        let NewCard = new HsCard(req.body.Name,req.body.Mana,req.body.Golden,req.body.Attack,req.body.HP,req.body.Keyword)
        async function insertCard() {
            await collection.insertOne(NewCard)
            res.status(200).json(NewCard);
        }
        insertCard();
    } else {
        res.status(400).send("You're missing a mandatory field")
    }

})
// UPDATE
app.put('/hs', (req, res) => {
    let card;
    if(req.body.id) {
        async function findCard() {
            card = await collection.findOne({"_id": ObjectId(req.body.id)})
            if (card !== null) {
                let UpdateCard = new HsCard(
                    req.body.Name ? req.body.Name : card.Name,
                    req.body.Mana ? req.body.Mana : card.Mana,
                    req.body.Golden ? req.body.Golden : card.Golden,
                    req.body.Attack ? req.body.Attack : card.Attack,
                    req.body.HP ? req.body.HP : card.HP,
                    req.body.Keyword ? req.body.Keyword : card.Keyword,
                )
                try {
                    await collection.updateOne({"_id": ObjectId(req.body.id)}, {$set: UpdateCard})
                    res.status(200).json(UpdateCard)
                } catch (e) {
                    res.status(400).send('Update Failed But card found')
                }
            } else {
                res.status(400).send('card not found,no matching id')
            }
        }

        findCard();
    } else {
        res.status(400).send('You need to specify an ID please.')
    }
})
// DELETE
app.delete('/hs',((req, res) => {
    if (req.body.id){
        async function deleteOne() {
            try {
                await collection.deleteOne({"_id": ObjectId(req.body.id)})
                res.status(200).send('Delete successful')
            }catch (e) {
                res.status(400).send("Failed, either not found or couldn't delete")
            }
        }
        deleteOne();
    }else {
        res.status(400).send('We only take id, please specify id.')
    }

}))
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
        this.Name = String(Name);
        this.Mana = Number(Mana);
        this.Golden = Boolean(Golden);
        this.Attack = Number(Attack);
        this.HP = Number(HP);
        this.Keyword = String(Keyword);
    }
}