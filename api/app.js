const bodyParser = require('body-parser');
const express = require('express')
const cors = require ('cors'); //débloque Allow-cross-originate ...
const database = require('./mySqlDb'); 
const testDatabase = require('./educdb_sql/sql_unit_tests/testDB'); 
const passport = require('passport'); 
const initializePassport = require('./authentication/passport-config');
const flash = require ('express-flash');
const session = require ('express-session');
const methodOverride = require('method-override');

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
    console.log(`Le serveur est lancé sur le port : ${PORT}`);
});

/**
 * Setup de passport
 */
initializePassport(passport);
app.use(flash());
app.use(session({   // !!!!!! SECU A FAIRE ICI !!!!!!!
    secret : '$2a$10$/XL50jdWZmHCtenhSXQaw.2GDtFSIfYfKUvJAUA3KFXlaUY66CQli',
    resave : false,
    saveUninitialized : false  
}));
app.use(passport.session());  

/**
 * Traitement lors d'un callback sur le site
 */
app.use(cors())
app.use(bodyParser.json()); //transforme toutes les reqêtes en json
app.use(bodyParser.urlencoded({ extended: false })); //same qu'au dessus mais pour les formulaires html
app.use(methodOverride('_method'));


// différentes routes Express
app.use("/", indexRouter);
app.use("/cours", coursRouter);
app.use("/cours/:cours/documents", documentsRouter);
app.use("/quiz", quizRouter);
app.use("/utilisateurs", utilisateursRouter);


