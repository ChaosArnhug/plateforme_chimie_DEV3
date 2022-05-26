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
router.get("/:quiz_id", /*permission.checkAuthentification ,*/  (req, res) =>{
    database.query(`
       CALL data_quiz(?, ?) `, [req.params.quiz_id, /*req.user.idUtilisateur*/1], (err, rows) => {

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


router.post("/:quiz_id", (req, res) =>{   
    
    let scores=0;

    //Parcour du tableau des réponses et calcul du score
    req.body.map( 
        (reponse,i) => (                                        
        database.query(`
            select a.points from questions a, reponses b 
            where  a.idQuestions=B.idQuestions and b.estCorrecte=1 and a.enonce=? and b.texteResponse = ?; `,[JSON.parse(reponse).question, JSON.parse(reponse).response], (err, rows, fields) => {
            
            if (! err){
                res.status(201);
                res.send()
                rows.forEach( (row) => {
                    scores += row.points;
                });  
                console.log("le score est :"+scores);     
            }
            else{
                res.send("An error occured");
                console.log(err);
            }
              
            }
            
        )
                   
        )
    )
    
    //calcul du total des points
    let total=0;
    database.query(`
    select sum(points) as total from questions  
    where  idQuiz= ?; `,[req.params.quiz_id], (err, rows, fields) => {
        
        if (! err){
            res.status(201);
            res.send()
            rows.forEach( (row) => {
                console.log("total="+row.total);
                total=row.total;
            });    
            
        }else{
            res.status(500);
            res.send("An error occured");
            console.log(err);
        }
    })
    
    //Insertion du score dans la base de données
    database.query(`
        CALL ajoutResultat(?, ?, ?, ?) `, [req.params.quiz_id, 1, scores, total], (err, rows) => {
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
router.post("/gestion/creation",/*permission.checkAuthentification,*/ async (req, res) =>{

    // query de l'id de chapitre, à l'interieur du callback je fait un query de la procédure qui ajoute un quiz
    await database.query( 
        `SELECT getChapId(?,?) AS chapId`, [req.body.cours, req.body.chapitre], async (err, result) => {

            chap_id = await result[0].chapId;  
            // Création du quiz en db
            await database.query(
                `CALL creationAjoutQuiz(?,?,?,?)`, [req.body.titre, req.body.description, 1, chap_id], async (err, result) => {  //mis visible de base

                    var quizId = await result[0][0].quizId; // id renvoyé par la procédure creationAjoutQuiz
                    
                    // Pour chaque question dans myQuestionsArray on crée une question en db
                    await req.body.myQuestionsArray.map(async (item) => {
                        await database.query(
                            `CALL creationAjoutQuestion(?,?,?,?,?)`, [item.titreQuestion, item.enonce, boolToInt(item.isQCM), item.points, quizId], async (err, result) => {  // quiz_id bon ?

                                var questionId = await result[0][0].questionId;

                                if (err){
                                    //await res.status(201);
                                    //await res.send("Quiz créé")
                                            
                                }
                                // mettre en place d'autres codes erreur

                                // Pour chaque réponse dans myReponsesArray dans l'objet question, on ajoute une réponse liée à cette question en db
                                await item.myReponsesArray.map(async(item2) => {
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





// Modification d'un quiz : Ne fait rien pour le moment
router.post("/gestion/modification", (req, res) =>{
    res.send({ error: "La modification n'est pas encore implémentée" });
})

module.exports = router;
