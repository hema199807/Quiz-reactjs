const express=require('express');
const router=express.Router();

const controller=require('./controller');

router.get('/questions',controller.getquestions);
router.post('/questions',controller.addquestions);


module.exports = router;