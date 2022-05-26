const localStrategy = require('passport-local').Strategy;
const bcrypt = require ('bcrypt');
const database = require ('../mySqlDb');

//Récupère des informations en DB sur base de l'émail envoyé par l'utilisateur
function queryPromiseAuthenticateUser (email) {
    return new Promise((resolve) =>{
        database.query(
            `select email, motDePasse, idUtilisateur as id from utilisateurs
            where email = ?`, [email], (err, rows) => {

            if (!err) {
               
                return resolve(rows);

            } else {
                console.log(err);
                return resolve(null)
            }
        });
    })
}

//Vérifie que les informations de connexion de l'utilisateur (email + MDP) correspondent à un utilisateur en DB
async function authenticateUser (email, motDePasse, done) { 
    try { 
        const user = await queryPromiseAuthenticateUser(email);
            
        if(user == null || user[0] === undefined) {
            return done(null, false, { message: "L'utilisateur n'a pas été trouvé" });
        }
    
        if (await bcrypt.compare(motDePasse, user[0].motDePasse)){
            return done(null, user[0]);

        } else {
            return done(null, false, { message: 'Le mot de passe est incorrecte'});
        }
    } catch (err) {
        return done(err);
    }

}

//Récupère des informations sur l'utilisateur connecté sur base de son ID sauvegardé dans un cookie
function queryPromiseGetUserById (id) {
    return new Promise((resolve) =>{
        database.query(
                `select idUtilisateur, nom, prenom, statut, groupe, classe, email, motDePasse from utilisateurs
                 where idUtilisateur = ?`, [id], (err, rows) =>{
                    
            if (!err) {
               
                return resolve(rows);

            } else {
                console.log(err);
                return resolve(null)
            }
        });
    })
}
//Ajoute un les informations de l'utilisateur connecté dans les requêtes API qu'il fait
async function getUserById (id){
    try {
        const user =  await queryPromiseGetUserById(id);
    
        if(user == null || user[0] === undefined) {
            return null
        }
        return user[0];

    } catch(err) {
        return err;
    }
     

}

//Initialisation + traitement de passport
function initialize (passport){
    
    passport.use(new localStrategy ({usernameField: 'email' , passwordField: 'motDePasse'}, authenticateUser));
    passport.serializeUser((user, done) => done(null,user.id));
    passport.deserializeUser(async (id, done) => { return done(null, await getUserById(id)) });   //return ?
}

module.exports = initialize