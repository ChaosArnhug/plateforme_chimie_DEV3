const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");
const permission = require("../authentication/permission")


router.get("/", (req, res) =>{
    
    database.query(`
        CALL liste_cours(?)`, [domain], (err, rows) => {

        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element);
                }
            });

        } else{
            res.send("An error occured");
            res.status(500);
            console.log(err);
        }
    })
})

router.get("/:cours", permission.checkAuthentification, (req, res) =>{
    database.query(`
        CALL data_cours(?, ?, ?)`, [domain, req.params.cours, req.user.idUtilisateur], (err, rows) => {

            if (! err){
                rows.forEach(element => {
                    if (element.constructor == Array) {
                       
                        if(element[0].Erreur){ //si pas accès au cours
                            res.status(403);
                        }
                        res.send(element);
                    }
                });
    
            }else{
                res.send("An error occured");
                res.status(500);
                console.log(err);
            }
        }
    )
})

router.get("/:cours/quiz", /*permission.checkAuthentification,*/ (req, res) =>{
    database.query(`
        call liste_quiz(?, ?, ?)`, [domain, req.params.cours, /*req.user.idUtilisateur*/1], (err, rows) => {

        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    if(element[0].Erreur){ //si pas accès au cours
                        res.status(403);
                    }
                    res.send(element); 
                }
            });

        }else{
            res.send("An error occured");
            res.status(500);
            console.log(err);
        }
    })
})

router.post("/:cours/chapitre", /*permission.checkAuthentification,*/ (req, res) =>{
    database.query(`
        call creationAjoutChapitre(?, ?, ?)`, [req.body.titreChapitre, req.body.estVisible, req.params.cours], (err, rows) => {

        if (! err){
            res.status(201);
            res.send(rows);

        }else{
            res.send("An error occured");
            res.status(500);
            console.log(err);
        }
    })
})

router.post("/:cours/inscription", permission.checkAuthentification, async (req, res) =>{
    database.query(`
        CALL demande_cours(?, ?, ?) `, [req.user.idUtilisateur, req.params.cours, req.body.code], (err, rows) => {
            if (! err){
                if (rows.constructor == Array){
                    rows.forEach(element => {
                        if (element.constructor == Array) {
                        
                            if(element[0].Erreur2){ //si cours existe pas
                                res.status(404);
                            }else if (element[0].Erreur3){
                                res.status(403);

                            }else if (element[0].Erreur1){
                                res.status(202);
                            }else{
                                res.status(200);
                            }

                            res.send(element); 
                        }
                    });
                
                
                }else{
                    res.status(201);
                    res.send();
                }   
            }else{
                res.send("An error occured");
                res.status(500);
                console.log(err);
            }
        }
    )
});


module.exports = router;