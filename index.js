const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json());

console.log(process.env.DB_USER);
app.get('/', (req, res) => {
  res.send('Rich Table Server')
})


const uri = `mongodb+srv://${richAdmin}:${Blockchai9}@cluster0.apc6x.mongodb.net/${richTable}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const mealCollection = client.db("richTable").collection("meal");
  console.log("database connected successfully");
  
  app.get('/meals', (req, res) => {
    mealCollection.find()
    .toArray((err, items) => {
      res.send(items)
      console.log(items);
    })
  })

  app.post('/mealData', (req, res) => {
    const newMeal = req.body;
    console.log("adding meal", newMeal);
    mealCollection.insertOne(newMeal)
    .then(result => {
      console.log('inserted', result.insertedCount);
      res.send(result.insertedCount > 0);
    })
  })
  // perform actions on the collection object
//   client.close();

app.get(`/checkout/:id`, (req, res) => {
  mealCollection.find({
    _id: ObjectId(req.params.id)
  })
  .toArray((err, items)=> {
      res.send(items)
      console.log('from database', items);
  })
})
app.get(`/placeorder/:id`, (req, res) => {
  mealCollection.find({
    _id: ObjectId(req.params.id)
  })
  .toArray((err, items)=> {
      res.send(items)
      console.log('from database', items);
  })
})

});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})