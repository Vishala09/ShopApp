const Cart=require('../models/CartBean');
const cartBean=Cart.cartBean;
const Checkout=require('../models/CheckoutBean');
const checkoutBean=Checkout.checkoutBean;

exports.getCheckoutItems=(req,res,next)=>{
    let log=typeof(loggedIn);
    if(log!="undefined" && loggedIn==true)
    {   
        checkoutProds=checkoutBean.getCheckout(); //{[bean,qty],checkoutPrice}
        res.render('shop/checkout',{checkoutProds:checkoutProds,path:"/checkout",docTitle:"Checkout Items"});
    }
    else
    {   
        let msg="Please log in first";
        res.render('users/loginPage',{msg:msg});
    }
}