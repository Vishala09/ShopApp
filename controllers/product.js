
const Product=require('../models/ProductBean');
const productBean=Product.productBean;

exports.getHomePage =(req,res,next) => {
   res.render('shop/home', {docTitle: 'Welcome!',path:'/',user:req.session.user});
}

exports.getAddProduct =(req,res,next) => {
    res.render('admin/add-product', {docTitle: 'Add Product',path:'/add-product',user:req.session.user});
 }
 
 exports.postAdded=(req,res,next) => {
    console.log("seller in add prod",req.session.seller);
    const bean=new productBean(null,req.body.title,req.body.imageUrl,req.body.description,req.body.price,Number(req.body.totalQty),req.session.seller.emailId);
    bean.save();
    console.log("/added -bean :- ",bean.id);
    res.redirect('/add-product');
} 
exports.getProductDetails= (req,res,next) => {
    let bean=productBean.getProductById(req.params.id);
    res.render('shop/product-details', {product:bean, docTitle: 'Product Details', path:'/product-details',user:req.session.user});
 }

exports.displayProducts= (req,res,next) => {
    res.render('shop/product-list', {msg: req.flash('msg'),prods:productBean.fetchAll(), docTitle: 'Shop-products', path:'/products-list',user:req.session.user});
 }  

 exports.displayProductsAdmin= (req,res,next) => {
    let products=productBean.fetchAll();
    let productsBySeller=[];
   products.forEach((element) => {
      if(element!=null && element.seller==seller.emailId)
      {
        productsBySeller.push(element);
      }
    });
    res.render('admin/product-list', {prods:productsBySeller, docTitle: 'Admin-products', path:'/admin-products'});
 } 

 exports.editItem = (req,res,next) => {
    console.log("Edit item - product controller: ",req.params.id);
    let product = productBean.getProductById(Number(req.params.id))
    res.render('admin/edit-product', {product:product, docTitle: 'Edit Product '+product.title, path:'/admin-products'});
  }

 exports.saveItem = (req,res,next) => {
   //from edit item to edit-prod.pug to save item
  let bean=new productBean(Number(req.params.id),req.body.title,req.body.imageUrl,req.body.description,req.body.price,Number(req.body.totalQty),req.session.seller.emailId);
  bean=bean.save();
  //console.log(bean);
  res.render('shop/product-details', {product:bean, docTitle: 'New Product', path:'/save'});
   }

 exports.deleteItem = (req,res,next) => {
    console.log("Delete item - product controller: ",req.body.id);
    let delProduct = productBean.getProductById(Number(req.body.id));
    productBean.deleteProductById(delProduct);
    res.render('admin/product-list', {delProduct, docTitle: 'Delete Product'+delProduct.title, path:'/admin-products'});
      //res.redirect('admin/product-list');
   }

 exports.getProductById = (req,res,next) => {
   id=req.params.id;
   productBean.getProductById(id);
}
