const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");

router.get("/", (req, res) =>{
    database.query(`
        select cours.nom, DATE_FORMAT(cours.dateCreation, '%Y-%m-%d') as dateCreation, CONCAT(utilisateurs.nom,' ',utilisateurs.prenom) as responsable, concat('${domain}', 'cours/',cours.nom) as url from cours
        inner join utilisateurs on cours.responsable = utilisateurs.idUtilisateur`, (err, rows) => {

        if (! err){
            res.send(rows);

        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

router.get("/:cours", (req, res) =>{
    database.query(`
        select cours.nom, DATE_FORMAT(cours.dateCreation, '%Y-%m-%d') as dateCreation, CONCAT(utilisateurs.nom,' ',utilisateurs.prenom) as responsable, concat('${domain}', 'quiz/',cours.nom) as quiz from cours
        inner join utilisateurs on cours.responsable = utilisateurs.idUtilisateur
        where cours.nom = ?`,[req.params.cours], (err, rows, fields) => {

            if (! err){
                res.send(rows);
    
            }else{
                res.send("An error occured");
                console.log(err);
            }
        }
    )
})

module.exports = router;