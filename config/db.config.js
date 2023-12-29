'use strict'
const mysql = require('mysql');

//local mysql db connection

const dbconn = mysql.createConnection({
    host :'localhost',
    user : 'formasit',
    password :'fokunang2000',
    database : 'e_construct'
})
dbconn.connect((err) =>{
    if(err) throw err;
    console.log('Database Connected');
});
module.exports = dbconn;