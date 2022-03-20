const express = require("express");
let router = express.Router();

let mysqlConnection = require("../mySqlDb");

router.get('/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM quiz_list',(err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else 
        console.log(err);
    })
});

module.exports = router