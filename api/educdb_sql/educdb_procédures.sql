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
IN _idCours int,
IN _titreQuestion varchar(45),
IN _enonce varchar(300),
IN _estQCM tinyint,
IN _points float,
IN _texteReponse varchar(300),
IN _estCorrect tinyint
)
-- NO RESULT SET
BEGIN
	DECLARE idQuiz int ;
	DECLARE idQuestion int ;

    -- Création d'un nouveau quiz, problème avec la colonne nommée "description"
	insert into quiz (titre, description, estVisible, idCours)
    values (_titre, _description, _estVisible, _idCours);

    SET idQuiz = (SELECT distinct max(idQuiz) FROM educdb_v2.quiz);

    CALL ajoutQuestion(_titreQuestion, _enonce, _estQCM, _points, idQuiz);

    SET idQuestion = (SELECT distinct max(idQuestions) FROM educdb_v2.questions);

    CALL ajoutReponse(_texteReponse, _estCorrect, idQuestion);

    -- Normalement ne pose pas de problème lorsqu'on va SELECT idQuiz et idQuestion. On va chercher la plus grande valeur et comme celle-ci
    -- est autoincrement on devrait prendre l'id du quiz/la question qu'on vient de créer.
    -- Il se pourrait que la prof crée deux quiz presque parfaitement n même temps -> ALORS PROBLEME !
    
END$$

DELIMITER ;