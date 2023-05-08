const express = require('express')
const app = express()
const port = 5000 //changed port to avoid conflict with react port number.
const cors = require("cors")
const bodyParser = require('body-parser');


//mongodb connection code below
const { MongoClient } = require('mongodb')
let dbName = 'myDB_SH'
let collectionName = 'user_col'

const url = `mongodb://192.168.137.195:27017/${dbName}`;

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
  res.send('Root route!')
})

app.get('/savedata', (req,res) => {
    MongoClient.connect(url)
    .then((client) => {
        console.log("Database created!");
        const db = client.db(dbName);
        console.log("Collection created");

        db.collection(collectionName).insertOne({name: "snehal harmalkar", 
                                        mobile: "9404145889", gender: "Male"})
        .then(() => {
        console.log("Document inserted!");
        client.close();
    })
   .catch((err) => {
    console.error(err);
    res.send("Error Occured while savinf data.")
   })
    })
    res.send('save data get')
})

//POst request to save data

app.post('/savedata', (req,res) => {
    MongoClient.connect(url)
    .then((client) => {
        console.log("Database created!");
        const db = client.db(dbName);
        console.log("Collection created");
        let pdata = {name : req.body.name, mobile : req.body.mobile, gender : req.body.gender}
        db.collection(collectionName).insertOne(pdata)
        .then(() => {
        console.log("Document inserted!");
        client.close();
        res.send(JSON.stringify({"error" : null, "response": "DATA SAVED SUCCESSFULLY"}))
    })
   .catch((err) => {
    console.error(err);
   // res.send("Error Occured while savinf data.")
   res.send(JSON.stringify({"error" : "ERROR SAVING DATA", "response": null}))

   })
    })
   // res.send('save data get')
})

app.get('/showdata', (req, res) => {
    MongoClient.connect(url)
    .then((client) => {
        console.log("Database accessed!");
        const db = client.db(dbName);
        console.log("Collection accessed");

        db.collection(collectionName).find({}, {projection: {_id: 0, name: 1, mobile: 1}}).toArray()
        .then((doc) => {
            console.log(doc);
            client.close();
           // res.send(doc);
           res.send(JSON.stringify({"error" : null, "response": doc}))
        })
        .catch((err) => {
            console.error(err);
           // res.send("Error Occured while savinf data.")
           res.send(JSON.stringify({"error" : "ERROR POPULATIING DATA", "response": null}))
        
           })
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
