const express=require('express');
const app=express();
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:path.join(__dirname,"config","config.env")});
const user=require("./router/userRouter");
const bill=require('./router/billRouter');
const stock=require('./router/stockRouter');

const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use('/api/',user)
app.use('/api/',bill)
app.use('/api/',stock)

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("port listen on "+PORT)
})
