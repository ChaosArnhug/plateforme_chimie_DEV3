const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");

router.get("/:cours", (req, res) =>{

    database.query(`
        select quiz.titre, quiz.description, quiz.estVisible as disponnible from quiz
        inner join cours on cours.idCours = quiz.idCours
        where cours.nom = '${req.params.cours}'`, (err, rows, fields) => {

        if (! err){
            res.send(rows);
        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

router.get("/:cours/:quiz_id", (req, res) =>{
    res.send({ title: 'QUIZ_ID' });
})

router.post("/{quiz_id}", (req, res) =>{
    res.send({ title: 'QUIZ_ID' });
})

router.get("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

router.post("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router