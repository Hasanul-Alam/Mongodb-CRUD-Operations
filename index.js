const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const objectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// username: mydbuser2
// password: CekJho4UZ5uG0tiq




const uri = "mongodb+srv://mydbuser2:CekJho4UZ5uG0tiq@cluster0.uvq0yvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// const client = new MongoClient(uri);

async function run () {
    try{
        const database = client.db('foodCluster');
        const usersCollection = database.collection('users');

        // GET API
        app.get('/users', async (req, res) => {
          const cursor = usersCollection.find({});
          const users = await cursor.toArray();
          res.send(users);
        })

        // Find One Document
        app.get('/users/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new objectId(id) };
          const user = await usersCollection.findOne(query);
          // console.log('load user with id: ', id);
          res.send(user);
      })

        // Post API
        app.post('/users', async (req, res) => {
          const newUser = req.body;
          const result = await usersCollection.insertOne(newUser);
          console.log('Got new user', req.body);
          console.log('Added user', result);
          res.json(result);
        })

        // PUT API
        app.put('/users/:id', async(req, res) => {
          const id = req.params.id;
          const updatedUser = req.body;
          const filter = { _id: new objectId(id) };
          const options = { upsert: true };
          const updateDoc = {
            $set: {
              name: updatedUser.name, email: updatedUser.email
            },
          };
          const result = await usersCollection.updateOne(filter, updateDoc, options);
          res.json(result);
          console.log('hitting update with id: ', id);
        })
        // Delete API
        app.delete('/users/:id', async (req, res) => {
          const id = req.params.id;
          const query = {_id: new objectId(id)}
          const result = await usersCollection.deleteOne(query);
          res.json(result)
        })
    }

    finally{
      // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Node is running without any hegitation.');
})

app.listen(port, () => {
    console.log('running server on port ', port);
});