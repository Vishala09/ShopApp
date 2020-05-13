const express=require('express');
const router =express.Router();
const productsController = require('../controllers/product');
const cartController=require('../controllers/cartController');
const checkoutController=require('../controllers/checkoutController');
const orderController=require('../controllers/orderController');

router.get('/',productsController.getHomePage);

router.get('/products-list',productsController.displayProducts);

router.get('/cart',cartController.getCartItems);

router.post('/cart',cartController.postCartItems);

router.post('/deleteFromCart',cartController.deleteFromCart);


router.use('/product-details/:id',productsController.getProductDetails);

router.use('/checkout',checkoutController.getCheckoutItems);

router.get('/orders',orderController.getOrders);

router.post('/orders',orderController.postOrders);

router.use('/buynow',orderController.buynow);

router.use('/orderSummary',orderController.orderSummary);

router.use('/getOrderSummaryPage',orderController.getOrderSummaryPage);

module.exports=router;