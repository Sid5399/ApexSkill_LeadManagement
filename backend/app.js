const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;


// const dotenv = require('dotenv');
// dotenv.config({path: './config.env'});


//require('./db/conn1');


require('./db/conn');
// const User = require('./model/userSchema');


app.use(express.json());

//linking the router files
app.use(require('./router/auth'));


//Middleware
// const middleware = (req, res, next) => {
//     console.log(`Hello middleware`);
//     next();
// }





app.get('/', (req, res) => {
    res.send(`HELLO WORLD`);
})

app.get('/home', (req, res) => {
    res.send(`HOME`);
})

app.get('/login', (req, res) => {
    res.send(`LOGIN`);
})
app.get('/signup', (req, res) => {
    res.send(`SIGNUP`);
})


app.get('/dashboard', (req, res) => {
    console.log(`dashboard > `);
    res.send(`DASHBOARD`);
})

// app.get('/leads', middleware, (req, res) => {
//     console.log('leads > ');
//     res.send(`LEADS`);
// })
//
// app.get('/leadstatus', middleware, (req, res) => {
//     console.log(`lead status > `);
//     res.send(`lead status / lead details`);
// })
//
// app.get('/reports', middleware,(req, res) => {
//     console.log(`reports > `);
//     res.send(`reports`);
// })
//
// app.get('/profiles',  middleware, (req, res) => {
//     console.log(`profiles > `);
//     res.send(`profiles / users `);
// })




app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})