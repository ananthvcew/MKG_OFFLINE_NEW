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
    const {location,currentBillNo,rows,payMode,userId,ac,fdate,tdate}=req.body;
    const alterROw=Array();
    console.log(req.body);
     connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi111");
        }
        else{
            const arrayValid = (row) =>{
               return  alterROw.push(row);
            }
            const addRow = (location, rowId)=>{
                const sql="select * from stock where location='"+location+"' and id='"+rowId+"'";
                conn.query(sql,(err, rowData) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(sql);
                        return rowData[0].pocket_stock;               
                    }
                })
            }
            const sql1="select count(id) as lastCount from billing where date >='"+fdate+"' and date<='"+tdate+"' and created_by='"+userId+"' and location='"+location+"'";  
                conn.query(sql1,(err, rowData) => {
                if(err){
                    console.log(err);
                }else{
                    const newBillNo =Number(rowData[0].lastCount)+Number(1);
                    console.log(sql1);
                    const BillNo =  newBillNo<10 ?  ac+location+userId+"0000"+newBillNo : newBillNo<100 ?  ac+location+userId+"000"+newBillNo : newBillNo<1000 ?  ac+location+userId+"00"+newBillNo : newBillNo<10000 ?  ac+location+userId+"0"+newBillNo : newBillNo>10000 ?  ac+location+userId+newBillNo : newBillNo;
                    if(payMode==="Cash"){
                        rows.map(row=>{
                            const pocketStock=addRow(location,row.id);                         
                            if(pocketStock===0){
                                arrayValid(row);
                                console.log("hi")
                            }                        
                        })
                        console.log(alterROw);
                    }else{
                        console.log("Else varuthu" +payMode)
                    } 





                }
            });
        }
    
    });
}