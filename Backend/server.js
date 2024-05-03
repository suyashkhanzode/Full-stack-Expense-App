
const express = require('express');

const app = express();

const db = require('./models/expense')

const expenseRoute = require('./routes/expense')

app.use(express.json());
app.use((request, response, next)=>{
   response.setHeader('Access-Control-Allow-Origin',"*");
   response.setHeader('Access-Control-Allow-Headers',
   "*");
   response.setHeader('Access-Control-Allow-Methods',"*")

   next();
});

app.use('/expenses',expenseRoute);

db.sync()
.then((res) =>{
    app.listen(4000,()=>{
        console.log("Server Started")
    })
})
.catch((err) =>{
    console.log(err);
})



