var express=require('express');
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

const appRoutes=require('./routes');

const hostname='localhost';
const port=3000;

const app=express();
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use('/',appRoutes);

mongoose.connect('mongodb+srv://root:Deva@123@cluster0.29oaz.mongodb.net/QuizDb?retryWrites=true&w=majority',
   {useNewUrlParser:true,useUnifiedTopology:true,dbName:"QuizDb"}
).then(res=>{
      app.listen(port,()=>{
    console.log(`server runing at http://${hostname}:${port}/ `);
    })
}).catch(err=>console.log(err))

