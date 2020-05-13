const path=require('path');
const fs=require('fs');
const Product=require('../models/ProductBean');
const productBean=Product.productBean;

const User=require('../models/RegisterBean');
const registerBean=User.userBean;

const cartFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getCartFromFile = cb => {
  fs.readFile(cartFile, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};



exports.cartBean=class CartBean{

        static reduceCartQty(bean,qty)
        { 
          getCartFromFile(cart => {
            const existingUserIndex = cart.findIndex(      
                      user => user.emailId === globalEmailId
                    );
              let id=bean.id;
                    let cartProducts=cart[existingUserIndex].userprods;
                    const existingProdIndex=cartProducts.findIndex( prod => prod!=undefined && prod!=null && prod.id == id);
                    if(existingProdIndex>=0)
                    {
                      cart[existingUserIndex].totalPrice =
                          cart[existingUserIndex].totalPrice - bean.price * qty;
                    cart[existingUserIndex].userprods[existingProdIndex].qty=cart[existingUserIndex].userprods[existingProdIndex].qty-qty;
                    console.log("CartBean-reduceCartQty",qty)
                    fs.writeFile(cartFile, JSON.stringify(cart), err => {
                      console.log("Error reduceCartQty:",err);
                    });
                  }
               });
        }
        static reduceAllCartQty(changeQty,qnty)
        { 
          getCartFromFile(cart => {
            const existingUserIndex = cart.findIndex(      
                      user => user.emailId === globalEmailId
                    );
            let cartProducts=cart[existingUserIndex].userprods;
            for(let i=0;i<changeQty.length;i++)
              {
                let id=changeQty[i].bean.id;
                const existingProdIndex=cartProducts.findIndex( prod => prod!=undefined && prod!=null && prod.id == id);         
                let qty=qnty[i];
                if(existingProdIndex>=0)
                    {
                      if(cart[existingUserIndex].userprods[existingProdIndex].qty>=qty){
                          cart[existingUserIndex].totalPrice =
                          cart[existingUserIndex].totalPrice - changeQty[i].bean.price*qty;
                          cart[existingUserIndex].userprods[existingProdIndex].qty=cart[existingUserIndex].userprods[existingProdIndex].qty-qty;
                          console.log("CartBean-reduceCartQty-if");
                      }  
                      else
                      {
                        let qt=cart[existingUserIndex].userprods[existingProdIndex].qty;
                        cart[existingUserIndex].totalPrice =cart[existingUserIndex].totalPrice - changeQty[i].bean.price*qt;
                        cart[existingUserIndex].userprods[existingProdIndex].qty=0;
                        console.log("CartBean-reduceCartQty-else");
                      }
                  }
              }
              console.log("CartBean-reduceCartQty")
                    fs.writeFile(cartFile, JSON.stringify(cart), err => {
                      console.log("Error reduceCartQty:",err);
                    });
                  
               });
        }
        static addCartToUser(emailId)
        { 
          fs.readFile(cartFile, (err, fileContent) => {
            let cart = [];
            if (!err) {
              cart = JSON.parse(fileContent);
            }
            let newCart = {emailId:emailId,
              userprods:[],
              totalPrice:0};
              cart.push(newCart);
              fs.writeFile(cartFile, JSON.stringify(cart), err => {
              console.log("Addcarttouser",err);
            });
          
          });
        }
        static addProductToCart(bean,emailId) {
          // Fetch the previous cart
          
          var id=bean.id;
          var price=bean.price;
          fs.readFile(cartFile, (err, fileContent) => {
            let cart = [{emailId:emailId,
              userprods:[{id,qty:0}],
              totalPrice:0}];
            if (!err) {
              cart = JSON.parse(fileContent);
            }
            const existingUserIndex = cart.findIndex(
              user => user.emailId === emailId
            ); 
            const existingProductIndex = cart[existingUserIndex].userprods.findIndex(
              prod => prod.id == id
            );
            const existingProduct = cart[existingUserIndex].userprods[existingProductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if (existingProduct) {
              updatedProduct = { ...existingProduct };
              updatedProduct.qty = updatedProduct.qty + 1;
              cart[existingUserIndex].userprods = [...cart[existingUserIndex].userprods];
              cart[existingUserIndex].userprods[existingProductIndex] = updatedProduct;
            } else {
              updatedProduct = {id: id, qty: 1 };
              cart[existingUserIndex].userprods = [...cart[existingUserIndex].userprods, updatedProduct];
            }
          
            cart[existingUserIndex].totalPrice = cart[existingUserIndex].totalPrice + +price;
            fs.writeFile(cartFile, JSON.stringify(cart), err => {
              console.log("Addprodtocart",err);
            });
          
          });
        }

        static deleteFromCart(bean)
        {
          var flag=0;
          getCartFromFile(cart => {
            //console.log("cart:-",cart);
            let product;
            for(let i=0;i<cart.length;i++) {
              if(loggedInAs === "customer")
              {
                product = cart[i].userprods.find(      
                  prod => prod.id === bean.id && cart[i].emailId===globalEmailId
                );
                console.log("loggedInAs:- customer");
                if (typeof(product) !="undefined")
                {
                  flag=1;
                }
              }
              else
              {
                          product = cart[i].userprods.find(      
                            prod => prod.id === bean.id
                          );
                          console.log("loggedInAs:- seller");
              }
                          console.log("cart[i]:-",product);
                      if (typeof(product) !="undefined"){
                      var productQty = product.qty;
                      console.log("prodQty:-",productQty);
                      
                        cart[i].userprods = cart[i].userprods.filter(                      
                          prod => prod.id != bean.id
                        );
                          cart[i].totalPrice =
                          cart[i].totalPrice - bean.price * productQty;
                        }
                        if(flag==1)
                        {
                          break;
                        }
                        }
                          fs.writeFile(cartFile, JSON.stringify(cart), err => {
                            console.log("deletefromcart",err);
                          });
            
          });
        }

        static updateTotalPriceOnEdit(editProd)
        {
          getCartFromFile(cart => {
            
               let tp=0;
               const productBean=Product.productBean;
               for(let i=0;i<cart.length;i++)
               {   
                 if(cart[i].userprods.id==editProd.id)
                 {
                   cart[i].totalPrice=cart[i].totalPrice-editProd.price;
                 }
               }
               
                 fs.writeFile(cartFile, JSON.stringify(cart), err => {
                   console.log("Error update tp",err);
                 });
          });
        }

        
        static getCart()
        {   
            let cart = [];
            let fileContent=[];
            fileContent=fs.readFileSync(cartFile,'utf8'); 
            cart = JSON.parse(fileContent);
            const existingUserIndex = cart.findIndex(
              user => user.emailId === globalEmailId
            );
            //console.log("get cart() - cart.length ",cart.length);
            return cart[existingUserIndex];
        }

        static fetchCart(cb) {
          getCartFromFile(cb);
        }
      

        
}