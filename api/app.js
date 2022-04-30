const bodyParser = require('body-parser');
const express = require('express')
const cors = require ('cors'); //débloque Allow-cross-originate ...
const bcrypt = require ('bcrypt');
const database = require('./mySqlDb'); 
const passport = require('passport');
const initializePassport = require('./passport-config');

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
 * Lance l'app sur le port ${PORT}
 */
app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT} }`);
});

/**
 * Setup de passport
 */
//initializePassport(passport);

/**
 * Traitement lors d'un callback sur le site
 */
app.use(cors())
app.use(bodyParser.json()); //transforme toutes les reqêtes en json

app.use("/", indexRouter);
app.use("/cours", coursRouter);
app.use("/cours/:cours/documents", documentsRouter);
app.use("/quiz", quizRouter);
app.use("/utilisateurs", utilisateursRouter);



/**
 * Connexion utilisateur sur le site 
*/
app.get('/inscription', (req, res) =>{
    res.send({ title: 'INSCRIPTION' });
});

app.post('/inscription', async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.motDePasse, 10);
        database.query(`CALL ajoutUtilisateur(?,?,?,?,?,?)`, [req.body.nom, req.body.prenom, req.body.groupe, req.body.classe, req.body.email, hashedPassword], 
        (err, rows) => {

        if (!err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element);
                }
                
            });
        }else {
            res.send('An error occured');
            console.log(err);
        }
        })

    } catch {
        res.redirect('/inscription');
    }
});

app.get('/connexion', (req, res) => {

});

app.post('/connexion', (req, res) => {

});
