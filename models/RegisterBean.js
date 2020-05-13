
const path=require('path');
const fs=require('fs');
const customersFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'customers.json'
  );
  
const Cart=require('../models/CartBean');
const cartBean=Cart.cartBean;
const PasswordProtection=require('./PasswordProtection');

  const getUsersFromFile = cb => {
    fs.readFile(customersFile, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
  exports.userBean=class UserBean{
    constructor(username,password,emailId,contact)
    { 
       // this.id=id;
        this.username=username;
        this.emailId=emailId;
        this.password=password;
        this.contact=contact;
    }
    registerUser(){
        fs.readFile(customersFile, (err, fileContent) => {
            let users = [];
            if (!err) {
              users = JSON.parse(fileContent);
            }
            //let encPass=PasswordProtection.encrypt(Buffer.from(this.password,"utf-8"));
            this.password=PasswordProtection.encrypt(Buffer.from(this.password,"utf-8"));
            console.log("this.pass",this.password)
            users.push(this);
            const cartBean=Cart.cartBean;
            cartBean.addCartToUser(this.emailId);
            console.log("Calling registerUser() - New User");
            fs.writeFile(customersFile, JSON.stringify(users), err => {
              console.log("registerUser() Error:",err);
            });
          });
    }
    // existingUserCheck()
    // {
    //   let existingUserIndex=null;
    //   getUsersFromFile(users => {
    //       existingUserIndex = users.findIndex(
    //         user => user.emailId === this.emailId
    //       );
          
    //       console.log("existingUserIndex",existingUserIndex);
    //       return existingUserIndex;
    //   });  
    // }
    

    static fetchAllUsers(cb) {
      getUsersFromFile(cb);
    }
    static fetchAllUsersSync(){
      let users = [];
        let fileContent=[];
        fileContent=fs.readFileSync(customersFile,'utf8'); 
        users = JSON.parse(fileContent);
        //console.log("fetchAll  from users file ",users.length,"   ",users);
        return users;
    }
    static getUserByEmailId(emailId)
    {   
        let users=UserBean.fetchAllUsersSync();
        let user=null;
        user=users.find(a => a!=null && a.emailId==emailId);
        //console.log("getUserByEmailId ",user);
        return user;
    }
}