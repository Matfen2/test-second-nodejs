const express = require('express');
const mongoose = require('mongoose');
const Games = require('./models/games');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/testDb'

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connection Success on database');
  })
  .catch(() => {
    console.log('Error connecting to database');
  })

app.get('/', (req, res) => {
  res.send('Hello Everyone');
})

// GET
app.get('/games', (req, res) => {
  Games.find()
    .then((games) => {
      res.status(200).send(games);
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error finding games', error });
    });
});

// POST
app.post('/games', (req, res) => {
  Games.create(req.body)
    .then((game) => {
      res.status(201).send(game);
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error creating game', error });
    });
});

// UPDATE
app.put('/games/:id', (req, res) => {
  Games.findByIdAndUpdate(req.params.id, req.body)
    .then((game) => {
      if (!game) {
        return res.status(404).send({ message: 'Game not found' })
      }
      res.status(200).send(game);
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error updating game', error });
    });
});

// DELETE
app.delete('/games/:id', (req, res) => {
  Games.findByIdAndDelete(req.params.id)
    .then((game) => {
      if (!game) {
        return res.status(404).send({ message: 'Game not found' })
      }
      res.status(200).send(game);
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error deleting game', error });
    });
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})
