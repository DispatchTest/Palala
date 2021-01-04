const express = require('express');
const router = express.Router();

//Check if user is Authenticated
const {isAuth} = require('../config/isAuth');

//Controller functions
const {getUsers,register,login,logOut} = require('../controllers/User');


router.route('/')
.get(isAuth,getUsers);


router.route('/login')
.post(login);

router.route('/register')
.post(register);

router.route('/logout')
.post(logOut);

module.exports = router;