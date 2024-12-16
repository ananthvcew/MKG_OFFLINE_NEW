const express=require('express');
const { getLastBillData, newBillGen } = require('../controllers/billController');
const router=express.Router();
router.route("/getLastBillData").post(getLastBillData);
router.route("/newBill").post(newBillGen);
module.exports=router;