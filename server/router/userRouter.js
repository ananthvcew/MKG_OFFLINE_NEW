const express=require('express');
const { userLogin } = require('../controllers/userController');
const router=express.Router();
router.route("/login").post(userLogin);
module.exports=router;