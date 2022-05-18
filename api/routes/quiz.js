const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");
const permission = require("../authentication/permission");


function boolToInt(boolean){
    if(boolean === true){
        return 1
    }
    else{
        return 0
    }
}


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


router.post("/:quiz_id", permission.checkAuthentification, (req, res) =>{
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

// Création d'un quiz
router.post("/gestion/creation", (req, res) =>{
    // Ajout du quiz dans la DB
    var quiz_id;
    var question_id;
    database.query(
        `CALL ajoutQuiz(?,?,?,?)`, [req.titre, req.description, 1, req.chapitre], (err, result) => {  //mis visible de base

            if (! err){
                res.status(201);
                res.send("Quiz créé")
            }
            // mettre en place d'autres codes erreur
            quiz_id = result[0].idQuiz  // result = array avec un seul objet ?
        }
        
    )
    // Pour chaque question dans myQuestionsArray on l'ajoute dans la DB
    req.myQuestionsArray.map((item) => {
        database.query(
            `CALL ajoutQuestion(?,?,?,?,?)`, [item.titre, item.enonce, boolToInt(item.isQCM), item.points, quiz_id], (err) => {  // quiz_id bon ?
    
                if (! err){
                    res.status(201);
                    res.send("Quiz créé")
                }
                // mettre en place d'autres codes erreur
                question_id = result[0].idQuestions  // result = array avec un seul objet ?
            }
        )
        item.myReponsesArray.map((item) => {
            database.query(
                `CALL ajoutReponse(?,?,?)`, [item.texteReponse, boolToInt(item.isCorrect), question_id], (err) => {   // Changer isCorrect de booléen à int
        
                    if (! err){
                        res.status(201);
                        res.send("Quiz créé")
                    }
                    // mettre en place d'autres codes erreur
                }
            )
        })
    })
     
})

// Pas sur de pouvoir utiliser quiz_id et question_id correctement. Elles sont définies avec var à l'interieur de la fonction de callback du post.
// On leur attribue une aleur dans les callbacks de database.query(...)  -> Est-ce que la valeur sera changée ?


// Modification d'un quiz
router.post("/gestion/modification", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router;