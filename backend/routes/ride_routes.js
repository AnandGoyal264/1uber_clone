const express=require('express');
const router = express.Router();
const {body}=require('express-validator');
const ridecontroller=require('../controllers/ride_controller.js')

router.post('/create',
body('pickup').isString().isLength({min:5}).withMessage('Invalid pickup location'),
body('destination').isString().isLength({min:5}).withMessage('Invalid destination location'),
ridecontroller.CreateRide

)
router.get('/fare',ridecontroller.getFare);
router.post('/confirmride',ridecontroller.confirmride);
router.post('/start-ride',ridecontroller.startRide);
router.post('/end-ride',ridecontroller.endRide);
module.exports=router;