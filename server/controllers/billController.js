const connectDb=require('../config/databaseconnection');
exports.getLastBillData=async(req, res, next)=>{
    const {location,userId}=req.body;
    connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi");
        }
        const sql="select * from billing where created_by='"+userId+"' and location='"+location+"' and id in (select max(id) from billing where created_by='"+userId+"' and location='"+location+"')";
        conn.query(sql,(err, rows) => {
            if (!err) {
                console.log(rows);
                console.log(sql);
                if(rows[0].id>0){

                    
                    res.json({
                        "status":"Done",
                        "lastBillNo":rows[0].bill_no,
                        "lastBillAmount":rows[0].total_amount,
                        "currentBillNo":rows[0].bill_no+1
                    })
                }else{
                    console.log(rows);
                }
            }
            else {
                console.log("error to get data" + err);
            }

        });
    });
}
exports.newBillGen=async(req,res,next)=>{
    const {location,currentBillNo,rows,payMode}=req.body;
    connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi");
        }
        else{
            if(payMode=="Cash"){
                const bill="";
                rows.map(row=>{
                const sql="select * from stock where location='"+location+"' and id='"+row.id+"'";
                conn.query(sql,(err, rowData) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(sql);
                       console.log(rowData) 
                    }
                })

                
                })
            }else{

            } 
        }
    });
}