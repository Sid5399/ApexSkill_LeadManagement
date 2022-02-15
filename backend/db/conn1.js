const { MongoClient } = require('mongodb');

async function main(){
    const uri = 'mongodb+srv://Siddhi:leejordanMongo@cluster0.yhvid.mongodb.net/' +
        'leadmanagementAgent?retryWrites=true&w=majority';

    const client = new MongoClient(uri);
    try{
        await client.connect();

        //await listDatabases(client);
       // await createUser(client, {
       //      name: " Fred ",
       //      email: "Fred822@gmail.com",
       //      password: "zxc",
       //      cpassword: "zxc",
       //      number: 9876543210
       //  })



       //  await createMultipleUsers(client, [
       //      {
       //      name: " George ",
       //      email: "George657@gmail.com",
       //      password: "pop",
       //      cpassword: "pop",
       //      number: 9876543210
       //      },
       //      {
       //          name: " Leah ",
       //          email: "Leah302@gmail.com",
       //          password: "sin",
       //          cpassword: "sin",
       //          number: 9876543210
       //      },
       //      {
       //          name: " Fred ",
       //          email: "Fred822@gmail.com",
       //          password: "zxc",
       //          cpassword: "zxc",
       //          number: 9876543210
       //      },
       //      {
       //          name: " Zach ",
       //          email: "Zach976@gmail.com",
       //          password: "up",
       //          cpassword: "up",
       //          number: 9876543210
       //      }]
       //  )


    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createUser(client, newUser) {
    const result = await client.db("leadmanagementAgent").collection("users").insertOne(newUser);

    console.log(`New user created with the following id: ${result.insertedId}`);
}


async function createMultipleUsers(client, newUsers){
    const result = await client.db("leadmanagementAgent").collection("users").insertMany(newUsers);
    console.log(`${result.insertedCount} New users created with the following id (s): `);
    console.log(result.insertedIds);
}


async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databaseList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}
