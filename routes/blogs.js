const express = require('express')
const router = express.Router();

const {create} = require('../controllers/blogs');
const {requireSignin,isAdmin,isAuth} = require('../controllers/userAuth');
const{userById}= require('../controllers/user');

router.post('/blogs/create/:userId', requireSignin, isAuth, create);
router.param("userId",userById);

module.exports = router;