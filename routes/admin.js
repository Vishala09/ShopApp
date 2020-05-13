const express =require('express');
const router =express.Router();
const productsController = require('../controllers/product');
const sellerController=require('../controllers/sellerController');

router.get('/admin-products',productsController.displayProductsAdmin);

router.use('/add-product', productsController.getAddProduct);

router.use('/added', productsController.postAdded);

router.use('/edit/:id', productsController.editItem);
router.use('/save/:id', productsController.saveItem);

//router.use('/delete/:id', productsController.deleteItem);

router.post('/delete', productsController.deleteItem);

router.post('/registerSeller', sellerController.postSeller);

router.get('/sellerLoginPage', sellerController.getSellerLoginPage);

router.post('/existingSellerCheck', sellerController.existingSellerCheck);

router.get('/sellerRegistrationPage', sellerController.getSellerRegisterPage);

router.get('/soldOut', sellerController.getSoldOutProds);

exports.router = router;