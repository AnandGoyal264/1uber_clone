const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const userController=require('../controllers/user_controllers.js');
const authMiddleware =require('../middleware/auth_middleware.js');




router.post('/register',[body('email').isEmail().withMessage('invalidemail'), body('fullname.firstname').isLength({min:3}).withMessage('must be greater than 3 character firstname')
    ,body('password').isLength({min:6}).withMessage('password must be longer than 6 character')
],userController.registerUser)
router.post('/login' , [body('email').isEmail().withMessage('invalidemail'),
body('password').isLength({min:6}).withMessage('password must be longer than 6')
],userController.loginUser)
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutuser)

module.exports=router;
