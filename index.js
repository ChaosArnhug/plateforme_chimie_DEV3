const mysql= require('mysql'); 
const express = require('express'); 
let app = express();
const bodyparser = require('body-parser'); 

app.use(bodyparser.json());

//DB connection properties
let mysqlConnection = mysql.createConnection({
    host: 'localhost', 
    user: 'educuser',
    password: 'educ',
    database: 'educdb'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log ('DB  connection succeded.');
    else 
        console.log ('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

//Express server
app.listen(3333,() =>console.log('API express server is running at port no: 3333'));


//Get all quiz_list
app.get('/quiz_list', (req,res)=>{
    mysqlConnection.query('SELECT * FROM quiz_list',(err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else 
        console.log(err);
    })
});

//Get a quiz
app.get('/quiz/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM questions WHERE quiz_id = ?',[req.params.id],(err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else 
        console.log(err);
    })
});