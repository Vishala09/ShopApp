const Product=require('../models/ProductBean');
const productBean=Product.productBean;
const Cart=require('../models/CartBean');
const cartBean=Cart.cartBean;
 

exports.getCartItems=(req,res,next)=>{
  let log=typeof(loggedIn);
    if(log!="undefined" && loggedIn==true)
    { 
    cart=cartBean.getCart();
    cart={...cart}
    cartProducts=[]  //bean,qty
    if(cart!=undefined && cart.userprods.length>0)
    for(prod of cart.userprods)
    {
      let bean=productBean.getProductById(prod.id);
      let elem={bean:bean,qty:prod.qty}

      cartProducts.push(elem);
    }
    res.render('shop/cart',{cart:cart,cartProducts:cartProducts,path:"/cart",docTitle:"Your Cart!",user:req.session.user});
  }
  else
  {   
      let msg="Please log in first";
      res.render('users/loginPage',{msg:msg});
  }
}
 
 exports.postCartItems = (req,res,next) => {
   let id=Number(req.body.id);
   let bean=productBean.getProductById(id);
   userEmailId=req.session.user.emailId;
   cart=cartBean.addProductToCart(bean,userEmailId);
   var msg=null;
    
         msg="Item "+bean.title+" added to cart";
    
   //console.log("msg",msg);
   //res.render('shop/cart',{cart:cart,cartProducts:cartProducts,path:"/cart",docTitle:"Your Cart!"});
   //res.redirect('/products-list?addtocart=true&title='+bean.title);
   req.flash('msg', msg);
   res.redirect('/products-list');
}
  
exports.deleteFromCart = (req,res,next) => {
  let id=Number(req.body.id);
  console.log(id);
  let bean=productBean.getProductById(id);
  //console.log("Delete from cart - Contrlr",bean);
  cartBean.deleteFromCart(bean);
  res.redirect('/cart');
}

