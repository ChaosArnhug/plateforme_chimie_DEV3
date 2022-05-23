const mysql= require('mysql'); 

//DB connection properties
let mysqlConnection = mysql.createConnection({
    host: 'localhost', 
    user: 'educuser',
    password: 'educ',
    database: 'educdb_v2',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log ('DB  connection succeeded.');
    else 
        console.log ('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;