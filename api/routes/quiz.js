const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");


//Il manque les images pour les questions et les réponses
router.get("/:quiz_id", (req, res) =>{
    database.query(`
       CALL data_quiz(?) `, [req.params.quiz_id], (err, rows) => {

        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element);
                }
            });
            
        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

//Faut qu'on discute du fonctionnement des quizs
router.post("/{quiz_id}", (req, res) =>{
    res.send({ title: 'QUIZ_ID' });
})

//Same que précédement 
router.post("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router;