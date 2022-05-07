const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");

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
            console.log(err);
        }
    })
})

router.get("/:cours", (req, res) =>{
    database.query(`
        CALL data_cours(?, ?)`, [domain, req.params.cours], (err, rows) => {

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
        }
    )
})

router.get("/:cours/quiz", (req, res) =>{

    database.query(`
        call liste_quiz(?,?)`, [domain, req.params.cours], (err, rows) => {

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

router.post("/:cours/inscription", async (req, res) =>{
    database.query(`
        CALL demande_cours(?, ?) `, [req.user.idUtilisateur, req.params.cours], (err, rows) => {
            if (! err){
                 res.status(201);

            }else{
                res.send("An error occured");
                console.log(err);
            }
        }
    )
});

module.exports = router;