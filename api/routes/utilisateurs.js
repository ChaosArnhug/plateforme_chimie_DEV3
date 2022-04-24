const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");

router.get("/:utilisateur_id/tentatives", (req, res) =>{
    database.query(`
    select titre, resultat, total from scores
    join quiz on quiz.idQuiz = scores.idQuizs
    where scores.idUtilisateurs = '${req.params.utilisateur_id}'`, (err, rows) =>{

        if (! err){
            res.send(rows);
        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

router.get("/:utilisateur_id/cours", (req, res) =>{
    database.query(`
    select cours.nom, concat('${domain}', 'cours/',cours.nom) as url from acces_cours
    join cours on cours.idCours = acces_cours.idCours
    join utilisateurs on utilisateurs.idUtilisateur = acces_cours.idUtilisateur
    where utilisateurs.idUtilisateur = '${req.params.utilisateur_id}'`, (err, rows) => {

        if (! err){
            res.send(rows);
        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

module.exports = router;