const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
const uri = "mongodb+srv://examrally-readonly:sU2oPVrFfdC0gw8Q@examrallyquestions.y9iuw.mongodb.net/?retryWrites=true&w=majority&appName=examrallyQuestions";

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

let collection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB database connection established successfully');
    const database = client.db('questions_set');
    collection = database.collection('questions_1');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  app.get('/quizzes/:quizId', async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId, 10);
      console.log(quizId)
      const findQuery = { questionID: quizId };
      const quiz = await collection.findOne(findQuery);

      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        res.json(quiz["questionSet"]);
        console.log(quiz["questionSet"].length)
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});