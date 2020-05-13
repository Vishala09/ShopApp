const path=require('path');
const fs=require('fs');
const Cart=require('../models/CartBean');
const cartBean=Cart.cartBean;
const Checkout=require('../models/CheckoutBean');
const checkoutBean=Checkout.checkoutBean;
const Product=require('../models/ProductBean');
const productBean=Product.productBean;
var changeQty=[];
const ordersFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'orders.json'
  );
  const getOrdersFromFile = cb => {
    fs.readFile(ordersFile, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

  //store bean here , bcoz if price changes 
//[{bean,qty,orderPrice,orderId,datetime}]
exports.orderBean=class OrderBean{
    constructor(productBean,qty,orderPrice,orderId,datetime)
    {
      this.productBean=productBean;
      this.qty=qty;
      this.orderPrice=orderPrice;
      this.orderId=orderId;
      this.datetime=datetime;
    }
    static reduceQty(qnty)
    { 
      const productBean=Product.productBean;
      console.log("reducing Qty",changeQty.length);
      productBean.reduceAllTotalQty(changeQty,qnty);
      cartBean.reduceAllCartQty(changeQty,qnty);
    }
  static  addCheckoutProductToOrders(products,qnty) {
      let orders=OrderBean.getAllOrders();
  // getOrdersFromFile(orders => {
        const existingUserIndex = orders.findIndex(
            user => user.emailId === globalEmailId
        ); 
            const existingUser=orders[existingUserIndex];
            let prod;let i=0;
        for(prod of products)
            {
          const oBean=OrderBean.createObean(prod.bean.id,qnty[i]);
          console.log("oBean-checkout");
          console.log("existingUserIndex",existingUserIndex);
          if(existingUser)
            {
              console.log("if");
              orders[existingUserIndex].orders.push(oBean);
            }
            else
            {
              const existingUserIndex = orders.findIndex(
                user => user.emailId === globalEmailId
                  ); 
                const existingUser=orders[existingUserIndex];
                if(existingUser)
                {
                  console.log("else if");
                  orders[existingUserIndex].orders.push(oBean);
                }
                else
                {
                  console.log("else else");
                  let order={emailId:globalEmailId,orders:[oBean]}
                  orders.push(order);
                }
            }
            let bean=oBean.productBean;
            changeQty[i]={bean};
            i=i+1;
             }
             fs.writeFile(ordersFile, JSON.stringify(orders), err => {
							console.log("Error postOrders",err);
              });
     // });
     //return Promise.resolve(1);
    }
  addProductToOrders() {
    const productBean=Product.productBean;
				getOrdersFromFile(orders => {
						const existingUserIndex = orders.findIndex(
						user => user.emailId === globalEmailId
						); 
            const existingUser=orders[existingUserIndex];
            //console.log("orders[existingUserIndex].orders 0",orders[existingUserIndex].orders);
						if(existingUser)
						{
							orders[existingUserIndex].orders.push(this);
							//console.log("orders[existingUserIndex].orders 1",orders);
						}
						else
						{
              console.log("else");
							 let order={emailId:globalEmailId,orders:[this]}
							 orders.push(order);
						}
              fs.writeFile(ordersFile, JSON.stringify(orders), err => {
                let bean=this.productBean;
                let qty=this.qty;
                productBean.reduceTotalQty(bean,qty);
                console.log("Error addCheckoutProductToOrders",err);
                });
          	});  
  }
        
       static createObean(id,qty)
       {
        const productBean=Product.productBean;
        let bean=productBean.getProductById(id);
        var  datetime=new Date();
        var date=OrderBean.getDate();
        datetime=datetime.toString().replace(/[' ']/g,'');
        datetime=datetime.toString().substr(6,14);
        var orderId=bean.id+bean.title.substr(0,4)+qty+datetime;
        var orderPrice=bean.price*qty;
        let oBean=new OrderBean(bean,qty,orderPrice,orderId,date);
        console.log("oBean-createBean OrderBean");
        return oBean;
       }
       static getDate()
       {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;
        return today;
       }
        static getOrders()
        {   
          
            let orders = [];
            let fileContent=[];
            fileContent=fs.readFileSync(ordersFile,'utf8'); 
            orders = JSON.parse(fileContent);
            const existingUserIndex = orders.findIndex(      
              user => user.emailId === globalEmailId
            );
            if(orders[existingUserIndex])
            return orders[existingUserIndex];
            else
            return {};
        }

        static getAllOrders()
        {   
          
            let orders = [];
            let fileContent=[];
            fileContent=fs.readFileSync(ordersFile,'utf8'); 
            orders = JSON.parse(fileContent);
            if(orders!=[])
            return orders;
            else
            return {};
        }
        

        
}