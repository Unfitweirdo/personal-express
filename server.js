const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://fwcii:k8wB7Fgy1ZnvDTt5@cluster0.dtybu.mongodb.net/?retryWrites=true&w=majority";
const dbName = "vrant";

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    db.collection('vrant').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log(result)
        res.render('index.ejs', { agent: result })
    })
})

app.post('/tierList', (req, res) => {
    db.collection('vrant').insertOne({
        agent: req.body.agent,
        tierList: false
    }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})

app.put('/agentPantry', (req, res) => {
    console.log(req.body)
    db.collection('vrant')

        .findOneAndUpdate({ agent: req.body.agent, tierList: false}, {

            $set: {
                tierList: true
            }
        }, {
            sort: { _id: -1 },
            upsert: false
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
})

app.delete('/retierAgents', (req, res) => {
    db.collection('vrant').deleteMany({}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
    })
})