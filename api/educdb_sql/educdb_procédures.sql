-- ----------------- Procédure d'ajout d'un utilisateur --------------------------

DROP procedure IF EXISTS `ajoutUtilisateur`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutUtilisateur` (
IN _nom varchar(45),
IN _prenom varchar(45),
IN _groupe varchar(45),
IN _classe varchar(45),
IN _email varchar (45),
IN _motDePasse varchar (60)
)
BEGIN
	
    # Gestion si utilisateur déjà existant
	declare exit handler for 1062 select "L'adresse email existe déjà" Erreur ;

    # ajout nouvel utilisateur
	insert into utilisateurs (nom, prenom, groupe, classe, email, motDePasse, statut)
    values (_nom, _prenom, _groupe, _classe, _email, _motDePasse, 'élève');
    
END$$

DELIMITER ;

-- ----------------- Procédure d'ajout d'une question --------------------------

DROP procedure IF EXISTS `ajoutQuestion`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutQuestion` (
IN _titreQuestion varchar(45),
IN _enonce varchar(300),
IN _estQCM tinyint,
IN _points float,
IN _idQuiz int
)
-- NO RESULT SET
BEGIN
	
    -- Création d'un nouveau quiz
	insert into quiz (titre, enonce, estQCM, points, idQuiz)
    values (_titreQuestion, _enonce, _estQCM, _points, _idQuiz);
    
END$$

DELIMITER ;

-- ----------------- Procédure d'ajout d'une réponse --------------------------

DROP procedure IF EXISTS `ajoutReponse`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutReponse` (
IN _texteReponse varchar(300),
IN _estCorrect tinyint,
IN _idQuestion int
)
-- NO RESULT SET
BEGIN
	
    -- Création d'un nouveau quiz, problème avec la colonne nommée "description"
	insert into quiz (texteReponse, estCorrect, idQuestions)
    values (_texteReponse, _estCorrect, _idQuestion);
    
END$$

DELIMITER ;

-- ----------------- Procédure d'ajout d'un quiz --------------------------

DROP procedure IF EXISTS `ajoutQuiz`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutQuiz` (
IN _titre varchar(45),
IN _description varchar(300),
IN _estVisible tinyint,
IN _idCours int
-- IN _titreQuestion varchar(45),
-- IN _enonce varchar(300),
-- IN _estQCM tinyint,
-- IN _points float,
-- IN _texteReponse varchar(300),
-- IN _estCorrect tinyint
)
-- NO RESULT SET
BEGIN
	-- DECLARE idQuiz int ;
	-- DECLARE idQuestion int ;

    -- Création d'un nouveau quiz, problème avec la colonne nommée "description"
	insert into quiz (titre, description, estVisible, idCours)
    values (_titre, _description, _estVisible, _idCours);

    -- SET idQuiz = (SELECT distinct max(idQuiz) FROM educdb_v2.quiz);

    -- CALL ajoutQuestion(_titreQuestion, _enonce, _estQCM, _points, idQuiz);

    -- SET idQuestion = (SELECT distinct max(idQuestions) FROM educdb_v2.questions);

    -- CALL ajoutReponse(_texteReponse, _estCorrect, idQuestion);

    -- Normalement ne pose pas de problème lorsqu'on va SELECT idQuiz et idQuestion. On va chercher la plus grande valeur et comme celle-ci
    -- est autoincrement on devrait prendre l'id du quiz/la question qu'on vient de créer.
    -- Il se pourrait que la prof crée deux quiz presque parfaitement n même temps -> ALORS PROBLEME !
    
END$$

DELIMITER ;


-- ============================================= COURS =============================================

-- ----------------------------------------- endpoint /cours ---------------------------------------
DROP procedure IF EXISTS `liste_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `liste_cours`(
IN _domaine varchar(45)
)
BEGIN

	select cours.nom, DATE_FORMAT(cours.dateCreation, '%Y-%m-%d') as dateCreation, CONCAT(utilisateurs.nom,' ',utilisateurs.prenom) as responsable, concat( _domaine, 'cours/',urlencode(cours.nom)) as url, concat( _domaine, 'cours/',urlencode(cours.nom), '/inscription') as inscription   from cours
	inner join utilisateurs on cours.responsable = utilisateurs.idUtilisateur; 
    
END$$

DELIMITER ;

-- --------------------------------------- endpoint /cours/{cours} -----------------------------------
DROP procedure IF EXISTS `educdb_v2`.`data_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `data_cours`(
IN _domaine varchar(45),
IN _nom_cours varchar(45)
)
BEGIN
		select cours.nom, DATE_FORMAT(cours.dateCreation, '%Y-%m-%d') as dateCreation, CONCAT(utilisateurs.nom,' ',utilisateurs.prenom) as responsable, concat(_domaine, 'cours/',urlencode(cours.nom),'/quiz') as quiz from cours
        inner join utilisateurs on cours.responsable = utilisateurs.idUtilisateur
        where cours.nom = _nom_cours;
END$$

DELIMITER ;
;



-- ---------------------------------------- endpoint /quiz/{cours} ------------------------------------
DROP procedure IF EXISTS `educdb_v2`.`liste_quiz`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `liste_quiz`(
IN _domaine varchar(45),
IN _nom_cours varchar(45) 
)
BEGIN
		select quiz.titre, quiz.description, quiz.estVisible as disponnible, concat(_domaine, 'quiz/', quiz.idQuiz) as toQuiz from quiz
        inner join cours on cours.idCours = quiz.idCours
        where cours.nom = _nom_cours;

END$$

DELIMITER ;
;

-- ----------------------------------------- endpoint /quiz/{id_quiz} ----------------------------------
DROP procedure IF EXISTS `data_quiz`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `data_quiz` (
IN _idQuiz int
)
BEGIN
	 select quiz.titre, quiz.description, quiz.estVisible, concat('[', group_concat('{', '"titreQuestion":"', QQ.titre, '",', '"enonce":"', QQ.enonce, '",', '"estQCM":"', QQ.estQCM, '",', '"points":', QQ.points, ',', '"reponses":',
	        (select concat('[',group_concat('{','"texteReponse":"',reponses.texteResponse,'",', '"estCorrecte":',reponses.estCorrecte, '}'), ']' ) from questions QR
	        inner join reponses on reponses.idQuestions = QR.idQuestions
	        where QR.idQuestions = QQ.idQuestions
	        group by QR.enonce),
        "}"   ), ']') as questions from quiz 
        inner join questions as QQ on QQ.idQuiz = quiz.idQuiz
        inner join cours on cours.idCours = quiz.idCours
        where quiz.idQUIZ = _idQuiz
        group by quiz.idQuiz;
END$$

DELIMITER ;

-- -------------------------------- endpoint /utilisateurs/{utilisateur_id}/quiz -----------------------------
DROP procedure IF EXISTS `resultats_utilisateurs`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `resultats_utilisateurs` (
IN _domaine varchar(45),
IN _idUtilisateur INT
)
BEGIN
	select titre, resultat, total, concat(_domaine, 'quiz/', quiz.idQuiz) as quiz from scores
    join quiz on quiz.idQuiz = scores.idQuizs
    where scores.idUtilisateurs = _idUtilisateur;

END$$

DELIMITER ;

-- ---------------------------------- endpoint /utilisateurs/{utilisateur_id}/cours --------------------------
DROP procedure IF EXISTS `cours_utilisateurs`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `cours_utilisateurs` (
IN _domaine varchar(45),
IN _idUtilisateurs INT
)
BEGIN

	select cours.nom, concat(_domaine, 'cours/',urlencode(cours.nom)) as url from acces_cours
    join cours on cours.idCours = acces_cours.idCours
    join utilisateurs on utilisateurs.idUtilisateur = acces_cours.idUtilisateur
    where utilisateurs.idUtilisateur = _idUtilisateurs;
    
END$$

DELIMITER ;

-- --------------------------------------------- endpoint /cours/utilisateurs --------------------------------
DROP procedure IF EXISTS `liste_demande_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `liste_demande_cours`(
IN _domaine varchar(45),
IN _responsable int
)
BEGIN
	select concat(utilisateurs.nom, ' ', utilisateurs.prenom) as utilisateur, groupe, classe, cours.nom as cours, date_demande, concat(_domaine, 'cours/utilisateurs?idUtilisateur=',utilisateurs.idUtilisateur) from acces_cours
	join utilisateurs on utilisateurs.idUtilisateur = acces_cours.idUtilisateur
	join cours on cours.idCours = acces_cours.idCours
	where accepte = 0 and responsable = _responsable;
END$$

DELIMITER ;
;

-- ----------------------------------------- endpoint /cours/utilisateurs?idUtilisateur= -------------------------
DROP procedure IF EXISTS `confirmation_inscription`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `confirmation_inscription` (
IN _idUtilisateur int
)
BEGIN	
	update acces_cours
    set accepte = 1
    where idUtilisateur = _idUtilisateur;
    
END$$

DELIMITER ;

-- ---------------------------------- endpoint /cours/{cours}/inscription ---------------------------------
DROP procedure IF EXISTS `demande_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `demande_cours`(
IN _idUtilisateur int,
IN _nomCours varchar(45)
)
BEGIN
	# Gestion si utilisateur déjà existant
	declare exit handler for 1062 select "La demande a déjà été effectuée" Erreur ;
    
    # Nouvelle demande
    insert into acces_cours (idUtilisateur, idCours, accepte, date_demande)
    values (_idUtilisateur, (select idCours from cours where nom = _nomCours) , 0, now());
END$$

DELIMITER ;
;