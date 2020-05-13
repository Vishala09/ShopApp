const path=require('path');
const fs=require('fs');
const Product=require('../models/ProductBean');
const productBean=Product.productBean;
const Cart=require('../models/CartBean');
const cartBean=Cart.cartBean;

  
exports.checkoutBean=class CheckoutBean{
  static getCheckout()
  {   
    const productBean=Product.productBean;
      const cart =cartBean.getCart();
      let checkoutProducts={products:[],checkoutPrice:0}  //products:bean,qty,checkoutPrice
      let checkoutPrice=0;
      let prod;
      for(prod of cart.userprods)
      {
        let bean=productBean.getProductById(prod.id);
        if(bean!==undefined && bean.totalQty>0 && prod.qty>0)
        {
          if(bean.totalQty < prod.qty)
          {
              prod.qty = bean.totalQty;
          }
          let elem={bean:bean,qty:prod.qty}
          checkoutPrice=checkoutPrice+bean.price*prod.qty;
          checkoutProducts.products.push(elem);
        }
      }
      checkoutProducts.checkoutPrice=checkoutPrice;
     console.log("Checkout prods",checkoutProducts)
      return checkoutProducts;
  }
}