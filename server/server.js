const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const router = require('../server/router/user-router')

const mongoConnect = require('../server/db/connect');
mongoConnect();

app.use(express.static('../client'))
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(router)




app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})