const path=require('path');
const fs=require('fs');
const sellersFile = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'sellers.json'
  );
const getSellersFromFile = cb => {
    fs.readFile(sellersFile, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
  const PasswordProtection=require('./PasswordProtection');

  exports.sellerBean=class SellerBean{
    constructor(username,password,emailId,contact,customerAccount)
    { 
       // this.id=id;
        this.username=username;
        this.emailId=emailId;
        this.password=password;
        this.contact=contact;
        this.customerAccount=customerAccount;
    }
    registerSeller(){
        fs.readFile(sellersFile, (err, fileContent) => {
            let sellers = [];
            if (!err) {
              sellers = JSON.parse(fileContent);
            }
            let encPass=PasswordProtection.encrypt(Buffer.from(this.password,"utf-8"));
            this.password=encPass;
            sellers.push(this);
            fs.writeFile(sellersFile, JSON.stringify(sellers), err => {
              console.log("registerSeller() Error:",err);
            });
          });
    }
  

    static fetchAllSellers(cb) {
      getSellersFromFile(cb);
    }
    static fetchAllSellersSync(){
      let sellers = [];
        let fileContent=[];
        fileContent=fs.readFileSync(sellersFile,'utf8'); 
        sellers = JSON.parse(fileContent);
        //console.log("fetchAll  from users file ",users.length,"   ",users);
        return sellers;
    }
    static getSellerByEmailId(emailId)
    {   
        let sellers=SellerBean.fetchAllSellersSync();
        let seller=null;
        seller=sellers.find(a => a!=null && a.emailId==emailId);
        //console.log("getUserByEmailId ",user);
        return seller;
    }
}