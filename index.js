const express = require('express'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


    // allRegisterUsers
    const registerUsers = client.db('eeceMain').collection('allRegisterUsers');
    app.post('/allRegisterUsers', async(req, res) =>{
      const message = req.body
      const result = await registerUsers.insertOne(message);
      res.send(result);
    })
    app.get('/allRegisterUsers', async(req, res) =>{
      const query = {};
      const options = await registerUsers.find(query).toArray();
      res.send(options);
    })

    app.get('/allRegisterUsers/:email', async(req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await registerUsers.findOne(query);
      res.send(user);
    })

    app.get('/allRegisterUsers/admin/:email', async(req, res) => {
      const email =  req.params.email;
      const query = { email };
      const user = await registerUsers.findOne(query)
      res.send({isAdmin: user?.role === 'admin'});
    })
    app.put('/allRegisterUsers/admin/:id', async(req, res) => {
          
          const user_email = req.body.email;
          const query = {email: user_email}
          const user = await registerUsers.findOne(query);
          if (user?.role !== 'admin') {
            return res.status(403).send({message: 'forbidden access'})
          }

          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
          const options = { upsert: true}; 
          const updatedDoc = {
            $set:{
              role: 'admin'
            }
          }
          const result = await registerUsers.updateOne(filter, updatedDoc, options);
          res.send(result);
    })

   //Gallery image 
    const gallery = client.db('eeceMain').collection('galleryImage');
    app.post('/galleryImage', async(req, res) =>{
      const message = req.body
      const result = await gallery.insertOne(message);
      res.send(result);
    })
    app.get('/galleryImage', async(req, res) =>{
      const query = {};
      const options = await gallery.find(query).toArray();
      res.send(options);
    })
  
    app.delete('/galleryImage/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await gallery.deleteOne(query);
      console.log("deleting One", result);
    
      if (result.deletedCount === 1) {
        res.send({ acknowledged: true });
      } else {
        res.status(404).send({ acknowledged: false, message: 'Image not found' });
      }
    });


    // for notice section
    const notice = client.db('eeceMain').collection('allNotice');
    app.post('/allNotice', async(req, res) =>{
      const message = req.body
      const result = await notice.insertOne(message);
      res.send(result);
    })
    app.get('/allNotice', async(req, res) =>{
      const query = {};
      const options = await notice.find(query).toArray();
      res.send(options);
    })
  
    app.delete('/allNotice/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await notice.deleteOne(query);
      console.log("deleting One", result);
    
      if (result.deletedCount === 1) {
        res.send({ acknowledged: true });
      } else {
        res.status(404).send({ acknowledged: false, message: 'Image not found' });
      }
    });
    
//  allNewsAndEvents
    // for news section
    const newsAndEvents = client.db('eeceMain').collection('allNewsAndEvents');
    app.post('/allNewsAndEvents', async(req, res) =>{
      const message = req.body
      const result = await newsAndEvents.insertOne(message);
      res.send(result);
    })
    app.get('/allNewsAndEvents', async(req, res) =>{
      const query = {};
      const options = await newsAndEvents.find(query).toArray();
      res.send(options);
    })
  
    app.delete('/allNewsAndEvents/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await newsAndEvents.deleteOne(query);
      console.log("deleting One", result);
    
      if (result.deletedCount === 1) {
        res.send({ acknowledged: true });
      } else {
        res.status(404).send({ acknowledged: false, message: 'Image not found' });
      }
    });


    // for countdown section
    const allCountDown = client.db('eeceMain').collection('countDown');
    app.post('/countDown', async(req, res) =>{
      const message = req.body
      const result = await allCountDown.insertOne(message);
      res.send(result);
    })
    app.get('/countDown', async(req, res) =>{
      const query = {};
      const options = await allCountDown.find(query).toArray();
      res.send(options);
    })
    app.delete('/countDown/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await allCountDown.deleteOne(query);
      console.log("deleting One", result);
    
      if (result.deletedCount === 1) {
        res.send({ acknowledged: true });
      } else {
        res.status(404).send({ acknowledged: false, message: 'Image not found' });
      }
    });




  } finally {
  

  }
}
run().catch(console.dir);


app.options('*', cors());
app.get('/', async(req, res) => {
    res.send('EECE server is running');
})

app.listen(port, () => console.log(`EECE server is running ${port}`));