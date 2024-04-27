const config = require('config');
const express = require('express');

const app = express();

const expenseRoute = require('./routes/expense')

app.use(express.json());
app.use((request, response, next)=>{
   response.setHeader('Access-Control-Allow-Origin',"*");
   response.setHeader('Access-Control-Allow-Headers',
   "*");
   response.setHeader('Access-Control-Allow-Methods',"*")

   next();
});

app.use('/sharpner',expenseRoute);




const PORTNO = config.get("PORT");

app.listen(PORTNO,()=>{
    console.log("Server Started")
})