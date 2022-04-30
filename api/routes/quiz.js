const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");

router.get("/:cours", (req, res) =>{

    database.query(`
        select quiz.titre, quiz.description, quiz.estVisible as disponnible, concat('${domain}', 'quiz/',cours.nom ,'/', quiz.idQuiz) as toQuiz from quiz
        inner join cours on cours.idCours = quiz.idCours
        where cours.nom = ?`,[req.params.cours], (err, rows, fields) => {

        if (! err){
            res.send(rows);
        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})
//Il manque les images pour les questions et les réponses
router.get("/:cours/:quiz_id", (req, res) =>{
    database.query(`
        select quiz.titre, quiz.description, quiz.estVisible, concat('[', group_concat('{', '"titreQuestion":"', QQ.titre, '",', '"enonce":"', QQ.enonce, '",', '"estQCM":"', QQ.estQCM, '",', '"points":', QQ.points, ',', '"reponses":',
	        (select concat('[',group_concat('{','"texteReponse":"',reponses.texteResponse,'",', '"estCorrecte":',reponses.estCorrecte, '}'), ']' ) from questions QR
	        inner join reponses on reponses.idQuestions = QR.idQuestions
	        where QR.idQuestions = QQ.idQuestions
	        group by QR.enonce),
        "}"   ), ']') as questions from quiz 
        inner join questions as QQ on QQ.idQuiz = quiz.idQuiz
        inner join cours on cours.idCours = quiz.idCours
        where cours.nom = ? and quiz.idQUIZ = ?
        group by quiz.idQuiz `,[req.params.cours, req.params.quiz_id], (err, rows, fields) => {

        if (! err){
            res.send(rows);
        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

//Faut qu'on discute du fonctionnement des quizs
router.post("/{quiz_id}", (req, res) =>{
    res.send({ title: 'QUIZ_ID' });
})

//Same que précédement 
router.post("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router;