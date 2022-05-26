const mysql= require('mysql'); 

//DB connection properties
let mysqlTestConnection = mysql.createConnection({
    host: 'localhost', 
    user: 'educuser',
    password: 'educ',
    database: 'educdb_test',
    multipleStatements: true
});

mysqlTestConnection.connect((err) => {
    /*
    if (!err)
        console.log ('Test DB connection succeeded.');
    else 
        console.log ('Test DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
    */
});

module.exports = mysqlTestConnection;


// Définit les propriétés de connections de la DB test
// DB identique à educdb_v2, seul le nom change