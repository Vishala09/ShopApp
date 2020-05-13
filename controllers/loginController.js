
exports.getLoginPage = (req,res,next) => {
    res.render('users/loginPage',{path:"loginPage"});
}

exports.logOut = (req,res,next) => {
    console.log("log out",loggedInAs);
    if (loggedInAs==="seller")
        {
            
            if(typeof(user)!="undefined" && user.emailId===seller.customerAccount)
            {
                console.log("matching seller with customer");
                req.session.user=user;
                global.globalEmailId=user.emailId;
                global.loggedInSeller=false;
                global.loggedIn=true;
                global.loggedInAs="customer";
                global.user=user;
                req.session.seller=undefined;
                global.seller=undefined;
            }
            else
            {
            req.session.seller=undefined;
            global.globalEmailId=null;
            global.loggedInSeller=false;
            global.loggedInAs=undefined;
            global.seller=undefined;
            }
            console.log("log out seller");
            res.redirect("/products-list");
        }
        else if (loggedInAs==="customer")
        {
            req.session.user=undefined;
            global.globalEmailId=null;
            global.loggedIn=false;
            global.loggedInAs=undefined;
            global.user=undefined;
            console.log("log out customer");
            res.redirect("/products-list");
        }

}