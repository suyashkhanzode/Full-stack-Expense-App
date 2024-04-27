const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const config = require('config');
const { error } = require('console');

const connectionDetails = {
     host : config.get("dbsetting.host"),
     user : config.get("dbsetting.user"),
     password : config.get("dbsetting.password"),
     database : config.get("dbsetting.database")
}

app.post("/addexpense",(request,response) => {
    var connection = mysql.createConnection(connectionDetails);
    debugger;
    var statement = `insert into  expense(title,amount) values('${request.body.title}','${request.body.amount}')`;
    connection.query(statement,(error,result) =>{
        if(error == null)
        {
            response.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            connection.end();
            response.send(data);
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.send(error);
        }
    })
});

app.get("/getexpense",(request,response) => {
    var connection = mysql.createConnection(connectionDetails);
    connection.query("select * from  expense",(error,result) =>{
        if(error == null)
        {
            response.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            connection.end();
            response.send(data);
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.send(error);
        }
    })
});

app.delete("/delete/:id",(request,response) => {
    var connection = mysql.createConnection(connectionDetails);
    var statement = `delete from expense where id = ${request.params.id}`;
    debugger;
    connection.query(statement,(error,result) =>{
        if(error == null)
        {
            response.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            connection.end();
            response.send(data);
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.send(error);
        }
    })
});


module.exports = app;