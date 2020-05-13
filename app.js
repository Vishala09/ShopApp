const express =require('express');
const app=express();

var session = require('express-session');
var flash = require('req-flash');

app.use(session({
secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
resave: false,
saveUninitialized: true
}));
// app.use(function(req,res,next){
//     res.locals.user=req.user;
//     next();
// })
app.use(flash());
//const expressHbs=require('express-handlebars');
//app.engine('hbs',expressHbs({extname: 'hbs'}));
//app.engine('hbs',expressHBS());
app.set('view engine', 'pug');
app.set('views', 'views');
const path=require('path');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const usersRoutes=require('./routes/users');

const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const errorController = require('./controllers/error');
app.use(adminRoutes.router);
app.use(shopRoutes);
app.use(usersRoutes);
app.use(errorController.errorPage);
app.listen(3000);