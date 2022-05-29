const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://username:password@cluster0.zwbyvsn.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('star-wars-quotes')
  const quotesCollection = db.collection('quotes')  
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(error => console.error(error))
})
  
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })
    app.listen(3000, function() {
        console.log('listening on 3000')
      })
})
.catch(console.error)

app.use(bodyParser.json())
  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
        { name: 'mary' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {res.join('Success')})
        .catch(error => console.error(error))
  })
  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(/* ... */)
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
  })

 