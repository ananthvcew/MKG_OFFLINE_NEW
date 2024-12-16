const mysql=require('mysql2');
const dbconn=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"vcew@123",
    database:"vcewacin_canteen"
});
module.exports = dbconn;