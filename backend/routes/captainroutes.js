const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const captain_controller=require('../controllers/captain_controller.js');
const authMiddleware=require('../middleware/auth_middleware.js');



router.post('/register',[body('email').isEmail().withMessage('invalidemail'), 
    body('fullname.firstname').isLength({min:3}).withMessage('must be greater than 3 character first'),
    body('fullname.lastname').isLength({min:3}).withMessage('must be greater than 3 character last'),
   // body('phone').isMobilePhone
        body('password').isLength({min:6}).withMessage('password must be longer than 6 character'),
        body('vehicle.color').isLength({min:3}).withMessage('color must be longer than 3 character'),
        body('vehicle.plate').isLength({min:3}).withMessage('model must be longer than 3 character'),
        body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be a positive integer'),
        body('vehicleType').isIn(['car','bus','bike']).withMessage('vehicle type must be car, bus or bike')
        

],
captain_controller.registerCaptain);
router.post('/login',[body('email').isEmail().withMessage('invalidemail'), body('password').isLength({min:6}).withMessage('password must be longer than 6')], captain_controller.loginCaptain);
router.get('/profile',authMiddleware.authCaptain,captain_controller.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captain_controller.logoutCaptain);
module.exports=router;