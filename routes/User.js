const express = require('express');
const router = express.Router();

//Check if user is Authenticated
const {isAuth} = require('../config/isAuth');

//Controller functions
const {getUsers,register,login,logOut,verifyUser} = require('../controllers/User');


router.route('/')
.get(isAuth,getUsers);


router.route('/login')
.post(login);

router.route('/register')
.post(register);

router.route('/register')
.post(register);

router.route('/register/verify/')
.post(verifyUser);

router.route('/logout')
.post(logOut);

module.exports = router;