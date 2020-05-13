const path=require('path');
const fs=require('fs');

const Order=require('../models/OrderBean');
const orderBean=Order.orderBean;

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );
  const totalCountFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'count.json'
  );
  const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
  const Cart=require('../models/CartBean');
  const cartBean=Cart.cartBean;


exports.productBean=class ProductBean{
    constructor(id,title,imageUrl,description,price,totalQty,seller)
    { 
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
        this.totalQty=totalQty;
        this.seller=seller;
    }
    static reduceTotalQty(bean,qty)
    { 
      getProductsFromFile(products => {
        let id=bean.id;
        //let products=ProductBean.fetchAll();
        const existingProdIndex=products.findIndex( prod => prod!=null && prod.id == id);
        products[existingProdIndex].totalQty=products[existingProdIndex].totalQty-qty;
         fs.writeFile(p, JSON.stringify(products), err => {
          console.log("Error:",err);
          console.log("Product - reduce total qty :-",qty,products[existingProdIndex].id,products[existingProdIndex].totalQty)
        
        });
      });
    }
    static reduceAllTotalQty(changeQty,qnty)
    {
      getProductsFromFile(products => {
        for(let i=0;i<changeQty.length;i++)
        {
          let id=changeQty[i].bean.id;
          var qty=qnty[i];
          const existingProdIndex=products.findIndex( prod => prod!=null && prod.id == id);
          products[existingProdIndex].totalQty=products[existingProdIndex].totalQty-qty;
        }
        //let products=ProductBean.fetchAll();
         fs.writeFile(p, JSON.stringify(products), err => {
          console.log("Error:",err);
         // console.log("Product - reduce total qty :-",qty,products[existingProdIndex].id,products[existingProdIndex].totalQty)
        
        });
      });
    }
    static getTotalCount()
    {
      let fileContent=fs.readFileSync(totalCountFile,'utf8'); 
      let totalCount = JSON.parse(fileContent);
      var count=totalCount.totalCount;
      totalCount.totalCount=Number(count)+1;
      fs.writeFile(totalCountFile, JSON.stringify(totalCount), err => {
        console.log("Error:",err);
      });
      
     // console.log("count outside",count+1);
        return count;
    }

    save()
    {   
          fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
              products = JSON.parse(fileContent);
            }
            
            if(this.id!=null)
            {
                const existingProdIndex=products.findIndex( prod => prod!=null && prod.id == this.id);
                let editProd=products[existingProdIndex];
              //  console.log("editProd:-",editProd)
                products[existingProdIndex]=this;
                fs.writeFile(p, JSON.stringify(products), err => {
                  console.log("Error:",err);
                  cartBean.updateTotalPriceOnEdit(editProd);
                });
                
                console.log("Calling save() -- Edit Product ",this);
            }
            else{
            const id=ProductBean.getTotalCount();
            console.log("id from get total count",id);
            this.id=id;
            products.push(this);
            console.log("Calling save() - New Product ",this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log("save() Error:",err);
            });
            }
          });
        return this;
    } 

    static deleteProductById(delProductBean)
    {
      let id=delProductBean.id;
      console.log("delprod-id",id);
      let products=ProductBean.fetchAll();
      //const existingProdIndex=products.findIndex( prod => prod!=null && prod.id == id);
      //products=products.splice(existingProdIndex,1);
      products = products.filter(                      
        prod => prod.id != id
      );
      console.log("After deleting");
      //console.log("After deleting",products);
      fs.writeFile(p, JSON.stringify(products),{flag: "w"}, err => {
        console.log("delete() Error",err);
      });
      cartBean.deleteFromCart(delProductBean);
    }
    static getProductById(id)
    {   
        let products=ProductBean.fetchAll();
        let prod=products.find(a => a!=null && a.id==id);
        //console.log("getProductById ");
        return prod;
    }
   
    static fetchAll()
    {   
        let products = [];
        let fileContent=[];
        fileContent=fs.readFileSync(p,'utf8'); 
        products = JSON.parse(fileContent);
        //console.log("fetchAll  from file ",products.length,"   ",products);
        return products;
    }
    static fetchAllBySeller()
    {  
      let productsBySeller=[]; 
      getProductsFromFile(products => {
        products.forEach((element) => {
          if(element.seller==seller.emailId)
          {
            productsBySeller.push(element);
          }
        });
        return productsBySeller;
      });
        
    }
    static getSoldOutProds()
    {
        let orders=orderBean.getAllOrders();
        let OrderedProducts=[];
        for(let i=0;i<orders.length;i++)
        {
          let order=orders[i].orders;
          for(let j=0;j<order.length;j++)
          {
            if(order[j].productBean.seller==globalEmailId)
            {
              let oProd={bean:order[j],emailId:orders[i].emailId};
              OrderedProducts.push(oProd);
            }
          }
        }
       // console.log("OrderedProducts:-",OrderedProducts);
        return OrderedProducts;
    }
}
