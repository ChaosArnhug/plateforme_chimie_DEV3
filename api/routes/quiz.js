const express = require("express");
let router = express.Router();

let mysqlConnection = require("../mySqlDb");

router.get('/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM questions WHERE quiz_id = ?',[req.params.id],(err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else 
        console.log(err);
    })
});
