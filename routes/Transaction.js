const express = require('express');
const router = express.Router();
const {isAuth} = require('../config/isAuth');
const {getAllTransactions,getTransaction,createTransaction,updateTransaction} = require('../controllers/Transaction');

router.route('/')
.get(getAllTransactions)
.post(createTransaction);

router.route('/:id')
.get(getTransaction)
.put(updateTransaction);


module.exports = router;