const bodyParser = require('body-parser');
const express = require('express')
const cors = require ('cors'); //débloque Allow-cross-originate ...

const PORT = "5000";
const app = express();

/**
 * Importation des routes
 */
const indexRouter = require ("./routes/index");
const coursRouter = require ("./routes/cours");
const documentsRouter = require ("./routes/documents");
const quizRouter = require ("./routes/quiz");
const utilisateursRouter = require ("./routes/utilisateurs");

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
app.use("/cours", coursRouter);
app.use("/cours/:cours/documents", documentsRouter);
app.use("/quiz", quizRouter);
app.use("/:utilisateur_id/tentatives}", utilisateursRouter);
