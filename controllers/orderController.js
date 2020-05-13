const Product=require('../models/ProductBean');
const productBean=Product.productBean;
const Order=require('../models/OrderBean');
const orderBean=Order.orderBean;
const Cart=require('../models/CartBean');
const cartBean=Cart.cartBean;
const Checkout=require('../models/CheckoutBean');
const checkoutBean=Checkout.checkoutBean;

exports.getOrders=(req,res,next)=>{
  let log=typeof(loggedIn);
    if(log!="undefined" && loggedIn==true)
    { 
  orders=orderBean.getOrders();   //[{bean,qty,orderPrice,orderId,datetime}]
    orders={...orders.orders};
    res.render('shop/orders',{orders:orders,path:"/orders",docTitle:"Your Orders"});
    }
    else
    {   
        let msg="Please log in first";
        res.render('users/loginPage',{msg:msg});
    }
  }
//checkout - true
exports.postOrders = (req,res,next) => {
    let checkout=req.query.checkout;
    console.log("Order controller-checkout mode",checkout);
    if(checkout == "true")
    {
      let checkoutProds=checkoutBean.getCheckout(); //{products:[bean,qty],checkoutPrice}
      const products=checkoutProds.products;
      orderBean.addCheckoutProductToOrders(products,req.body.qnty);
      console.log("req.body:-",req.body.qnty);
      orderBean.reduceQty(req.body.qnty);
    } 
    res.redirect('/orders');
 }

 exports.buynow=(req,res,next)=>{
    let id=Number(req.body.id);
    let bean=productBean.getProductById(id);
    res.render('shop/buynow',{product:bean,path:"/orders",docTitle:"Buy Now"});
}

exports.orderSummary=(req,res,next)=>{
  let checkout=false;
  let id=Number(req.body.id);
  let qty=Number(req.body.qty);
       const oBean=orderBean.createObean(id,qty);
       console.log("oBean-buyNow",oBean);
  let orderedProd=oBean.addProductToOrders(checkout);
  let product={bean:oBean};
  //req.flash('product', product);
  req.session.product=product;
  res.redirect('/getOrderSummaryPage');
  //res.render('shop/orderSummary',{product:product,path:"/orders",docTitle:"Orders Summary"});
}

exports.getOrderSummaryPage=(req,res,next)=>{
  // let product=req.flash('product');
   let product=req.session.product;
   res.render('shop/orderSummary',{product:product,path:"/orders",docTitle:"Orders Summary"});
 }