const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");
const permission = require("../authentication/permission");


//Il manque les images pour les questions et les réponses
router.get("/:quiz_id", (req, res) =>{
    //, permission.checkAuthentification
    database.query(`
       CALL data_quiz(?, ?) `, [req.params.quiz_id, 1], (err, rows) => {
           //req.user.idUtilisateur

        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    if(element[0].Erreur1){ //si pas accès au quiz
                        res.status(403);

                    }else{
                        res.status(200);
                    }
                    res.send(element);
                }
            });
            
        }else{
            res.status(500);
            res.send("An error occured");
            console.log(err);
        }
    })
})


router.post("/{quiz_id}", permission.checkAuthentification, (req, res) =>{
    database.query(`
       CALL ajoutResultat(?, ?, ?, ?) `, [req.params.quiz_id, req.user.idUtilisateur, req.body.resultat, req.body.total], (err, rows) => {

        if (! err){
            res.status(201);
            res.send()
            
        }else{
            res.status(500);
            res.send("An error occured");
            console.log(err);
        }
    })
})

//Same que précédement 
router.post("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router;