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
router.get("/:quiz_id", permission.checkAuthentification, (req, res) =>{
    database.query(`
       CALL data_quiz(?, ?) `, [req.params.quiz_id, req.user.idUtilisateur], (err, rows) => {

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


/*
// Création d'un quiz
router.post("/gestion/creation", (req, res) =>{
    // Ajout du quiz dans la DB
    var quiz_id;
    var question_id;
    database.query(
        `CALL creationAjoutQuiz(?,?,?,?)`, [req.body.titre, req.body.description, 1, req.body.chapitre], (err, result) => {  //mis visible de base

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
            `CALL creationAjoutQuestion(?,?,?,?,?)`, [item.titre, item.enonce, boolToInt(item.isQCM), item.points, quiz_id], (err) => {  // quiz_id bon ?
    
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
                `CALL creationAjoutReponse(?,?,?)`, [item.texteReponse, boolToInt(item.isCorrect), question_id], (err) => {   // Changer isCorrect de booléen à int
        
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
*/






function getIdQuestion(question_nom){

}

// Création d'un quiz
router.post("/gestion/creation", async (req, res) =>{
    // Ajout du quiz dans la DB

    // query de l'id de chapitre, à l'interieur du callback je fait un query de la procédure qui ajoute un quiz
    await database.query( 
        `SELECT getChapId(?,?) AS chapId`, [req.body.cours, req.body.chapitre], async (err, result) => {
            await console.log(result)
            chap_id = await result[0].chapId;  // moyen de changer le nom ?
            await console.log(chap_id);
            await database.query(
                `CALL creationAjoutQuiz(?,?,?,?)`, [req.body.titre, req.body.description, 1, chap_id], async (err, result) => {  //mis visible de base

                    await console.log(result);
                    var quizId = await result[0][0].quizId; // id renvoyé par la procédure creationAjoutQuiz
                    
                    await req.body.myQuestionsArray.map(async (item) => {
                        await database.query(
                            `CALL creationAjoutQuestion(?,?,?,?,?)`, [item.titreQuestion, item.enonce, boolToInt(item.isQCM), item.points, quizId], async (err, result) => {  // quiz_id bon ?
                                await console.log(result[0][0])
                                var questionId = await result[0][0].questionId;

                                if (err){
                                    //await res.status(201);
                                    //await res.send("Quiz créé")
                                            
                                }
                                // mettre en place d'autres codes erreur
                                //question_id = await result[0].idQuestions  // result = array avec un seul objet ?
                                await item.myReponsesArray.map(async(item2) => {
                                    await console.log(item2.texteReponse)
                                    await console.log(item2.isCorrect)
                                    await console.log(questionId)
                                    await database.query(
                                        `CALL creationAjoutReponse(?,?,?)`, [item2.texteReponse, boolToInt(item2.isCorrect), questionId], async (err) => {   // Changer isCorrect de booléen à int
                                        
                                            if (err){
                                                //await res.status(201);
                                                //await res.send("Quiz créé")
                                                        
                                            }
                                            // mettre en place d'autres codes erreur
                                        }
                                    )

                                })
                            }
                        );       
                    })   
                }
            )   
        }
    )
    
})



// Pas sur de pouvoir utiliser quiz_id et question_id correctement. Elles sont définies avec var à l'interieur de la fonction de callback du post.
// On leur attribue une aleur dans les callbacks de database.query(...)  -> Est-ce que la valeur sera changée ?


// Modification d'un quiz
router.post("/gestion/modification", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router;