const connectDb=require('../config/databaseconnection');
exports.getItemData=async(req,res,next)=>{
    
    const {location, elem}=req.body;
    connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi");
        }
        console.log(location);
        console.log(elem);
        const sql="select a.*,b.*, b.id as stock_id, b.gst as gst, a.i_name as i_name from inventory a left join stock b on a.i_code=b.i_code where b.location='"+location+"' and (a.i_code like '"+elem+"%' or a.id like '"+elem+"%' or a.i_name like '"+elem+"%') and avail_stock>0";
        conn.query(sql,(err, rows) => {
            if (!err) {
                console.log(rows);
                console.log(sql);
                console.log(req.body);  
                if(rows.length>0){                   
                    res.json({
                        "status":"Done",
                        "itemDetails":rows,
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
exports.getItemDetails=async(req,res,next)=>{
    const {location,itemId}=req.body;
    connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi");
        }
        console.log(location);
        console.log(req.body);
        console.log(itemId);
        const sql="select a.*,b.*, b.id as stock_id, b.gst as gst, a.i_name as i_name from inventory a left join stock b on a.i_code=b.i_code where b.location='"+location+"' and  b.id='"+itemId+"' and avail_stock>0";
        conn.query(sql,(err, rows) => {
            if (!err) {
                console.log(rows);
                console.log(sql);
                console.log(req.body);  
                if(rows.length>0){                   
                    res.json({
                        "status":"Done",
                        "itemDetails":rows[0],
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

exports.getItemDataById = async(req,res,next)=>{
    const {location,itemCode}=req.body;
    connectDb.getConnection((err, conn) => {
        if (err) {
            console.log("hi");
        }
        console.log(location);
        console.log(req.body);
        console.log(itemCode);
        const sql="select a.*,b.*, b.id as stock_id, b.gst as gst, a.i_name as i_name from inventory a left join stock b on a.i_code=b.i_code where b.location='"+location+"' and  b.i_code='"+itemCode+"' and avail_stock>0";
        conn.query(sql,(err, rows) => {
            if (!err) {
                console.log(rows);
                console.log(sql);
                console.log(req.body);  
                if(rows.length>0){                   
                    res.json({
                        "status":"Done",
                        "itemDetails":rows[0],
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