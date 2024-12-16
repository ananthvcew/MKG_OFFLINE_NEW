const connectDb=require('../config/databaseconnection');
const MD5=require("crypto-js/md5");
const md5 = require('md5');
exports.userLogin=async(req,res,next)=>{
    // console.log(req.body);
    const {username,password}=req.body;
    connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi"+err);
        }
        const sql="select * from user where uname='"+username+"'";
        conn.query(sql,(err, rows) => {
            if (!err) {
                console.log(rows);
                console.log(sql);
                if(rows[0].pass==md5(password)){
                    res.json({
                        "status":"Done",
                        "user":rows[0]
                    })
                }else{
                    console.log(rows[0].pass+"="+md5(password));
                }
            }
            else {
                console.log("error to get data" + err);
            }

        });
    });

    
}
