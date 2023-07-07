const express = require('express'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


const app = express();

// middlewire
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://eece:YXTaCVffSZph50Xz@cluster0.d9kttfl.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    // teachers
    const teacherCollection = client.db('eeceMain').collection('teachers');
    app.get('/teachers', async(req, res) => {
      const query = {};
      const options =await teacherCollection.find(query).toArray();
      res.send(options);
    })

    // contactMessageCollection 
    const contactMessageCollection = client.db('eeceMain').collection('messageCollection');
    app.post('/messageCollection', async(req, res) => {
      const message = req.body
      console.log(message);
      const result = await contactMessageCollection.insertOne(message);
      res.send(result);
    })

    app.get('/messageCollection', async(req, res) => {
      const query = {};
      const options = await contactMessageCollection.find(query).toArray();
      res.send(options);
    })



    
  } finally {
  

  }
}
run().catch(console.dir);


app.get('/', async(req, res) => {
    res.send('EECE server is running');
})

app.listen(port, () => console.log(`EECE server is running ${port}`));