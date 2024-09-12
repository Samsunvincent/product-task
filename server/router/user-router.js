const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user-controller')



router.post('/submit',user_controller.create);
router.get('/submit',user_controller.getproducts);
router.get('/product/:id',user_controller.getproduct);
router.put('/product/:id',user_controller.updateproduct)
router.delete('/product/:id',user_controller.deleteproduct);

module.exports = router