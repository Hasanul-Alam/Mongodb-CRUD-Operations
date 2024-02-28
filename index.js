const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

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

        const user = {name: 'Nishat Afifa', email: 'nisat.affifa@gmail.com', phone: '01518332185'}

        // Post API
        app.post('/users', async(req, res) => {
          const newUser = req.body;
          const result = await usersCollection.insertOne(newUser);
          console.log('Got new user', req.body);
          console.log('Added user', result);
          res.json(result);
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