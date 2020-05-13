const Register=require('../models/RegisterBean');
const registerBean=Register.userBean;

const PasswordProtection=require('../models/PasswordProtection');

exports.getUser=(req,res,next)=>{
    //res.render('shop/cart',{cart:cart,cartProducts:cartProducts,path:"/cart",docTitle:"Your Cart!"});
}

exports.existingUserCheck=(req,res,next)=>{
    const registerMode=req.query.register;
    const username=req.body.username;
    const password=req.body.password;
    const emailId=req.body.emailId;
    const contact=req.body.contact;
    const bean = new registerBean(username,password,emailId,contact);
    let user;
    user=registerBean.getUserByEmailId(emailId);//Getting user data from storage
    //existingUser=bean.existingUserCheck();
    //console.log("registerMode",registerMode,user); 
    if(registerMode=="true"){
        if(user)
        {   
            const msg="You are already a user. Please login!"
            res.render('users/loginPage',{msg:msg});
        }
        else
        {   
            bean.registerUser();
            const msg="Registered Successfully! Please login again."
            res.render('users/loginPage',{msg:msg});
        }
    }
    else  //loginMode
    {     
        if(user)    ////Application STARTS
        {   
            //req.session;
            //get user-based 1.cart 2.orders
            
            //CHECK FOR CORRECT PASSWORD(NOTE:PASSWORD IS ENCRYPTED)
            let decPass=PasswordProtection.decrypt(user.password);
            //password=from view // decPass -> get user(email's) password, decrypt it and compare
            if(decPass===password)
            {
                req.session.user=user;
                global.globalEmailId=user.emailId;
                global.loggedInSeller=false;
                global.loggedIn=true;
                global.loggedInAs="customer";
                global.user=user;
                res.redirect('/products-list');
            }
            else
            {
                const msg="Username/Password is wrong.Please do enter the correct credentials."
                res.render('users/loginPage',{msg:msg});
            }
           
        }
        else
        {   
            console.log("not a registered user")
            const msg="You are not a registered user. Please register!"
            res.render('users/registrationPage',{msg:msg});
        }
    }
}
 exports.postUser = (req,res,next) => {
     
    console.log("registerController-postUser-registerUser()");
    //req.flash('msg', "User Registered");
    res.redirect('/products-list');
}

exports.getRegisterPage = (req,res,next) => {
    res.render('users/registrationPage',req.session);
}
  
