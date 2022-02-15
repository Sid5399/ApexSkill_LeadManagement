
const mongoose = require('mongoose');

const DB = 'mongodb+srv://Siddhi:leejordanMongo@cluster0.yhvid.mongodb.net/leadmanagementAgent?retryWrites=true&w=majority'


mongoose.connect(DB).then(() => {
    console.log(`connection was successful`);
}).catch((err) => console.log(`error in connection`));




// const { MongoClient } = require('mongodb');
// const {createConnection} = require("mongoose");
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
//
//
// async function getData()
// {
//     let result = await client.connect();
//     console.log('Connection successful');
//     let db = result.db(database);
//     let collection = db.collection('users');
//     let response = await collection.find({}).toArray();
//     console.log(response);
// }
//
// getData()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
//




