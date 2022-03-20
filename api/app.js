const bodyParser = require('body-parser');
const express = require('express')
const cors = require ('cors'); //débloque Allow-cross-originate ...

const PORT = "5000";
const app = express();

/**
 * Importation des routes
 */
const indexRouter = require ("./routes/index");
//const quiz_listRouter = require ("./routes/quiz_list");
//const quizRouter = require ("./routes/quiz");

/**
 * Lauch and make the app listening on the port : ${PORT}
 */
app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT} }`);
});

/**
 * Traitement lors d'un callback sur le site
 */
app.use(cors())
app.use(bodyParser.json()); //transforme toutes les reqêtes en json

app.use("/", indexRouter);
//app.use("/quiz_list",quiz_listRouter);
//app.use("/quiz", quizRouter);