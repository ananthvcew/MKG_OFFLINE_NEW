const express=require('express');
const { getItemData, getItemDetails, getItemDataById } = require('../controllers/stockController');
const router=express.Router();
router.route("/getSearchItems").post(getItemData);
router.route("/getItemData").post(getItemDetails);
router.route("/getItenDataById").post(getItemDataById);
module.exports=router;