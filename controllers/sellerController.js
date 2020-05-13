
const Register=require('../models/RegisterBean');
const registerBean=Register.userBean;

const Seller=require('../models/SellerBean');
const sellerBean=Seller.sellerBean;

const Product=require('../models/ProductBean');
const productBean=Product.productBean;

const PasswordProtection=require('../models/PasswordProtection');

exports.getSellerLoginPage = (req,res,next) => {
    res.render('admin/sellerLoginPage');
}

exports.existingSellerCheck=(req,res,next)=>{
    const registerMode=req.query.register;
    const username=req.body.username;
    const password=req.body.password;
    const emailId=req.body.emailId;
    const contact=req.body.contact;
    let customerAccount;
    let typeOfgeid=typeof(globalEmailId);
    if(typeOfgeid != "undefined")
    customerAccount=globalEmailId;
    else
    customerAccount=null;
    const bean = new sellerBean(username,password,emailId,contact,customerAccount);
    let seller;
    seller=sellerBean.getSellerByEmailId(emailId);
    //existingUser=bean.existingUserCheck();
    console.log("registerMode",registerMode); 
    if(registerMode=="true"){
        if(seller)
        {
            const msg="You are already a seller. Please login!"
            res.render('admin/sellerLoginPage',{msg:msg});
        }
        else
        {   
            bean.registerSeller();
            const msg="Registered Successfully! Please login again with your seller account."
            res.render('admin/sellerLoginPage',{msg:msg});
        }
    }
    else  //loginMode
    {     
        if(seller)    ////Application STARTS
        {   
            //req.session;
            //get user-based 1.cart 2.orders
             //CHECK FOR CORRECT PASSWORD(NOTE:PASSWORD IS ENCRYPTED)
             let decPass=PasswordProtection.decrypt(seller.password);
             if(decPass===password)
             {
                req.session.seller=seller;
                global.globalEmailId=seller.emailId;
                global.loggedInSeller=true;
                global.loggedIn=false;
                global.loggedInAs="seller";
                global.seller=seller;
                res.redirect('/admin-products');
             }
             else
             {
                 const msg="Username/Password is wrong.Please do enter the correct credentials."
                 res.render('users/loginPage',{msg:msg});
             }
            
        }
        else
        {   
            console.log("not a registered seller")
            const msg="You are not a registered seller. Please register as seller!"
            res.render('admin/sellerRegistrationPage',{msg:msg});
        }
    }
}
 exports.postSeller = (req,res,next) => {
     
    console.log("registerController-postUser-registerSeller()");
    //req.flash('msg', "User Registered");
    res.redirect('/admin-products');
}

exports.getSellerRegisterPage = (req,res,next) => {
    res.render('admin/sellerRegistrationPage');
}
  
exports.getSoldOutProds = (req,res,next) => {
    const OrderedProds=productBean.getSoldOutProds();
    res.render('admin/soldOut',{path:"/soldOut",OrderedProds:OrderedProds});
}