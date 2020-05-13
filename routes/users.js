const express =require('express');
const router =express.Router();
const registerController=require('../controllers/registerController');
const loginController=require('../controllers/loginController');

router.post('/registerUser', registerController.postUser);

router.use('/registrationPage', registerController.getRegisterPage);

router.post('/existingUserCheck', registerController.existingUserCheck);

router.use('/loginPage', loginController.getLoginPage);

router.use('/logoutPage', loginController.logOut);

module.exports=router;