const quiz=require('./model');

exports.getquestions=(req,res,next)=>{
    quiz.aggregate([{$sample:{size:10}}]).then(response=>{

    
         
    res.status(200).json({message:'location featched successfully',display:response[0],questionslist:response})
        
    }).catch(err=>{
        res.status(500).json({message:err})
    })
   
}



exports.addquestions=(req,res,next)=>{
    const question=req.body.question;
    const optionA=req.body.optionA;
    const optionB=req.body.optionB;
    const optionC=req.body.optionC;
    const optionD=req.body.optionD;
    const correct=req.body.correct;
   
    const Quiz=new quiz({question:question,optionA:optionA,optionB:optionB,optionC:optionC,optionD:optionD,correct:correct});
    Quiz.save().then(result=>{
        res.status(200).json({message:"questions addeded successfully",quizlist:result});
    }).catch(err=>console.log(err));

}