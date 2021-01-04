const express = require('express');
const router = express.Router();
const {isAuth} = require('../config/isAuth');

const {getAllProducts,createProduct,getProduct,updateProduct,deleteProduct,search,filter} = require('../controllers/Product');


router.route('/')
.get(getAllProducts)
.post(isAuth,createProduct);

router.route('/:id')
.get(getProduct)
.put(isAuth,updateProduct)
.delete(isAuth,deleteProduct);


router.route('/search/:query')
.get(search);

router.route('/filter/:query')
.get(filter);

module.exports = router;