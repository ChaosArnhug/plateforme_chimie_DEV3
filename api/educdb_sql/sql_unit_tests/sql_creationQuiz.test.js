const database_test = require("./testDB.js");
const path = require('path');
const fs = require('fs');
const { doesNotMatch } = require("assert");


const initDB = fs.readFileSync(path.join(__dirname, './educdb_test.sql')).toString();
const insertDB = fs.readFileSync(path.join(__dirname, './educdb_test_insert.sql')).toString();
const functionDB = fs.readFileSync(path.join(__dirname, './educdb_test_function.sql')).toString();
const procedureDB = fs.readFileSync(path.join(__dirname, './educdb_test_procédures.sql')).toString();


const query1 = database_test.query(initDB,  (err, result) => {
    if (err){
       //throw err;
    }else{
      //res.send("DB test recréée");
    }
});

const query2 = database_test.query(insertDB,  (err, result) => {
  if (err){
     //throw err;
  }else{
    //res.send("On a inséré des données dans la DB test");
  }
});

const query3 = database_test.query(functionDB,  (err, result) => {
  if (err){
     //throw err;
  }else{
    //res.send("On a créé les fonctions de la DB test");
  }
});

const query4 =  database_test.query(procedureDB,  (err, result) => {
  if (err){
     //throw err;
  }else{
    //res.send("On a créé les procédures de la DB test");
  }
});




//----------------------------------- tests -----------------------------------//


/*
test("test SQL", async () => {
  await database_test.query('SELECT * from cours', async (err, result) => {
    expect.hasAssertions();
    expect(JSON.parse(JSON.stringify(result[0]))).toEqual({
      idCours: 1,
      responsable: 1,
      nom: 'Chimie 5ième',
      dateCreation: '2022-05-22T22:00:00.000Z',
      code_acces: '1234'
    });
    
  })
  
})
*/
// Teste non valide car dateCreation change, on recrée la db à chaque test



test("test 1 procédure SQL creationAjoutQuiz", async () => {

  await database_test.query('CALL creationAjoutQuiz("Quiz 3","Ceci est le quiz 3.",1,2)', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0][0].quizId))).toEqual(8);

    await database_test.query(`SELECT idQuiz, titre, description, estVisible FROM quiz WHERE idQuiz = ?`, [result[0][0].quizId], 
      async (err, result2) => {
        await expect.hasAssertions();
        await expect(JSON.parse(JSON.stringify(result2[0]))).toEqual({
            "description": "Ceci est le quiz 3.",
            "estVisible": 1,
            "idQuiz": 8,
            "titre": "Quiz 3",
          });
      }
    )
  })
  
})

test("test 2 procédure SQL creationAjoutQuiz", async () => {

  await database_test.query('CALL creationAjoutQuiz("Quiz 4","mmmmmm.",0,4)', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0][0].quizId))).toEqual(9);

    await database_test.query(`SELECT idQuiz, titre, description, estVisible FROM quiz WHERE idQuiz = ?`, [result[0][0].quizId], 
      async (err, result2) => {
        await expect.hasAssertions();
        await expect(JSON.parse(JSON.stringify(result2[0]))).toEqual({
            "titre": "Quiz 4",
            "description": "mmmmmm.",
            "estVisible": 0,
            "idQuiz": 9,
          });
      }
    )
  })
  
})


test("test 1 procédure SQL creationAjoutQuestion", async () => {

  await database_test.query('CALL creationAjoutQuestion("Question 1","Ceci est la question 1.",1, 3,2)', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0][0].questionId))).toEqual(5);

    await database_test.query(`SELECT idQuestions, titre, enonce, estQCM, points, idQuiz FROM questions WHERE idQuestions = ?`, [result[0][0].questionId], 
      async (err, result2) => {
        await expect.hasAssertions();
        await expect(JSON.parse(JSON.stringify(result2[0]))).toEqual({
            "enonce": "Ceci est la question 1.",
            "estQCM": 1,
            "idQuiz": 2,
            "points": 3,
            "titre": "Question 1",
            "idQuestions": 5
          });
      }
    )
  })
  
})


test("test 2 procédure SQL creationAjoutQuestion", async () => {

  await database_test.query('CALL creationAjoutQuestion("Question 2","Ceci est la question 2.",0, 1,8)', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0][0].questionId))).toEqual(6);

    await database_test.query(`SELECT idQuestions, titre, enonce, estQCM, points, idQuiz FROM questions WHERE idQuestions = ?`, [result[0][0].questionId], 
      async (err, result2) => {
        await expect.hasAssertions();
        await expect(JSON.parse(JSON.stringify(result2[0]))).toEqual({
            "enonce": "Ceci est la question 2.",
            "estQCM": 0,
            "idQuiz": 8,
            "points": 1,
            "titre": "Question 2",
            "idQuestions": 6,
          });
      }
    )
  })
  
})



test("test procédure SQL creationAjoutReponse", async () => {

  await database_test.query('CALL creationAjoutReponse("Réponse 1",1,5)', async (err, result) => {
    await expect.hasAssertions();

    await database_test.query(`SELECT texteResponse, estCorrecte, idQuestions FROM reponses WHERE idQuestions = 5`, 
      async (err, result2) => {
        await expect.hasAssertions();
        await expect(JSON.parse(JSON.stringify(result2[0]))).toEqual({
            "texteResponse": "Réponse 1",
            "estCorrecte": 1,
            "idQuestions": 5,
          });
      }
    )
  })
  
})


test("test 1 fonction SQL getCoursId", async () => {

  await database_test.query('SELECT getCoursId("Chimie 5ième") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(1);

  })
})

test("test 2 fonction SQL getCoursId", async () => {

  await database_test.query('SELECT getCoursId("Chimie 6ième") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(2);

  })
})

test("fonction SQL getCoursId cours inexistant", async () => {

  await database_test.query('SELECT getCoursId("Chimie 7ième") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(null);

  })
})


test("test 1 fonction SQL getChapId", async () => {

  await database_test.query('SELECT getChapId("Chimie 5ième", "Chapitre 1") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(1);

  })
})

test("test 2 fonction SQL getChapId", async () => {

  await database_test.query('SELECT getChapId("Chimie 6ième", "Chapitre 1") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(3);

  })
})

test("fonction SQL getChapId d'un cours inexistant", async () => {

  await database_test.query('SELECT getChapId("Chimie 7ième", "Chapitre 1") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(null);

  })
})

test("fonction SQL getChapId d'un chapitre inexistant", async () => {

  await database_test.query('SELECT getChapId("Chimie 5ième", "Chapitre 22") AS chapterId', async (err, result) => {
    await expect.hasAssertions();
    await expect(JSON.parse(JSON.stringify(result[0].chapterId))).toEqual(null);

  })
})




