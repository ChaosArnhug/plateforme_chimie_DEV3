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

router.get("/:cours/quiz", permission.checkAuthentification, (req, res) =>{

    // , permission.checkAuthentification (note pour tom laiseer svp)
    database.query(`
        call liste_quiz(?, ?, ?)`, [domain, req.params.cours, req.user.idUtilisateur], (err, rows) => {
            // req.user.idUtilisateur remplacer par 1 (note pour tom laiseer svp)

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

router.post("/:cours/inscription", permission.checkAuthentification, async (req, res) =>{
    database.query(`
        CALL demande_cours(?, ?) `, [req.user.idUtilisateur, req.params.cours], (err, rows) => {
            if (! err){
                if (rows.constructor == Array){
                    rows.forEach(element => {
                        if (element.constructor == Array) {
                        
                            if(element[0].Erreur2){ //si cours existe pas
                                res.status(404);
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