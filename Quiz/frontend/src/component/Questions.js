import React from 'react';
import '../styles/instructions.css';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '69%',
      height                :  '90%',
      background            : 'aliceblue'
    }
};



class Questions extends React.Component{
    constructor(){
        super();
        this.state={
            questions:[],
            dis:{},
            count:0,
            answer:[],
            option:'',
            cheakModel:false,
            resultModel:false
           
        }
    }
    componentDidMount(){
        axios({
            method:'GET',
            url:'http://localhost:3000/questions',
            headers:{'Content-Type':'aplication/json'}
        })
        .then(response=>{
            this.setState({questions:response.data.questionslist,dis:response.data.display})
        })
        .catch(err=>console.log(err))
    }
    handleClick=(item)=>{
        const {questions,count,option,answer}=this.state;
        const i=count+1;
        const ans=answer;
        const obj=ans.find(ansitem=>{return ansitem.question==item.question})
        if(!obj){
            item["opt_correct"]=item.correct;
            item["correct"]=item["option"];
            item.option=option;
            if(item.opt_correct==item.option){
                item["message"]="correct answer"
                item["rc"]=1
            }
            if(item.opt_correct!=item.option && item.option!=""){
                item["message"]="wrong answer"
                item["rc"]=0
            }
            if(item.option==""){
                item["message"]="not answered"
                item["rc"]=0
            }
            ans.push(item);
        } 
        localStorage.setItem('answer',JSON.stringify(ans));
        if(i<=9){
            this.setState({dis:questions[i],count:i,option:'',answer:ans})
        }
        
    }
    handleChange=(option)=>{
       
        this.setState({option:String(option)})
           
    }
    handleTestClick=(item)=>{
        const {questions,count,option,answer,rescount}=this.state;
        const i=count+1;
        if(i==9){
            this.setState({dis:questions[i],count:i,option:'',answer:ans})
        }
        const ans=answer;
        const obj=ans.find(ansitem=>{return ansitem.question==item.question})
        if(!obj){
            item["opt_correct"]=item.correct;
            item["correct"]=item["option"];
            item.option=option;
            if(item.opt_correct==item.option){
                item["message"]="correct answer"
                item["rc"]=1
            }
            if(item.opt_correct!=item.option && item.option!=""){
                item["message"]="wrong answer"
                item["rc"]=0
            }
            if(item.option==""){
                item["message"]="not answered"
                item["rc"]=0
            }
            ans.push(item);
        } 
        localStorage.setItem('answer',JSON.stringify(ans)); 
        this.setState({cheakModel:true})   
    }

    handleClose = () => {
        this.setState({cheakModel:false})
    }
    handleShow=()=>{
        this.setState({resultModel:true})
    }
    handlerClose=()=>{
        this.setState({resultModel:false})
    }
    handlebShow=()=>{
        this.props.history.push('/')
    }
    render(){
        const {questions,dis,count,option,answer,cheakModel,resultModel}=this.state;
        return(
            <React.Fragment>
               <div className="numb">{count+1}/{questions.length}</div>
                <div className="container-fluid">
                    <div className="row">
                         <div className="col-sm-12 col-md-12 col-lg-4" >
                                        <div className="tileContainer">
                                            
                                        <div className="question">{dis.question}</div>
                                       
                                        <div className="options">
                                        <div style={{display: "block"}}>
                                       
                                            <input type="radio" name='op' checked={option=='A'} onChange={()=>this.handleChange('A')}/>
                                            <span className="optiona">{dis.optionA}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" name='op' checked={option=='B'} onChange={()=>this.handleChange('B')}/>
                                            <span className="optionb">{dis.optionB}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" name='op' checked={option=='C'} onChange={()=>this.handleChange('C')}/>
                                            <span className="optionc">{dis.optionC}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" name='op' checked={option=='D'} onChange={()=>this.handleChange('D')}/>
                                            <span className="optiond">{dis.optionD}</span>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                       
                        
                    </div>
                </div>
              
              {count<9?<button className="btn btn-sm btn-primary " style={{marginLeft:"50%"}} onClick={()=>this.handleClick(dis)}>Next</button>:<button className="btn btn-sm btn-primary " style={{marginLeft:"50%"}} onClick={()=>this.handleTestClick(dis)}>Test End</button>}
              <Modal
                       isOpen={cheakModel}
                       style={customStyles}
                    >
                     <button className="btn btn-sm btn-danger" style={{ position:'sticky',top: '0px',float:"right"}} onClick={this.handleClose}>❌</button>   
                        <div className="container-fluid">
                    <div className="row">
                        {answer.map((item)=>{
                         return <div className="col-sm-12 col-md-12 col-lg-12" >
                                        <div className="tileContainer1">
                                            
                                        <div className="question">{item.question}</div>
                                       
                                        <div className="options">
                                        <div style={{display: "block"}}>
                                        
                                            <input type="radio"  />
                                            <span className="optiona">{item.optionA}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" />
                                            <span className="optionb">{item.optionB}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" />
                                            <span className="optionc">{item.optionC}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio"  />
                                            <span className="optiond">{item.optionD}</span>
                                        </div>
                                        </div>
                                        <div  className="yoption">Your answer is: {" " +`${item.option}`}</div>
                                        {item.message=="wrong answer"?<div className="coptions" style={{color:"red"}}>{item.message}</div>:<div></div>}
                                        {item.message=="correct answer"?<div className="coptions" style={{color:"green"}}>{item.message}</div>:<div></div>}
                                        {item.message=="not answered"?<div className="coptions" style={{color:"blue"}}>{item.message}</div>:<div></div>}
                                        
                                        </div>
                                    </div>
                       })}
                        
                    </div>
                </div>

                <div style={{position:'sticky',bottom: '10px'}}>
                    <button className="btn btn-sm btn-danger" style={{ float:"right"}} onClick={this.handleShow}>show result</button>
                </div>
                    </Modal>  


                    <Modal
                       isOpen={resultModel}
                       style={customStyles}
                    >
                     
                     <button className="btn btn-sm btn-danger" style={{ position:'sticky',top: '0px',float:"right"}} onClick={this.handlerClose}>❌</button> 
                    
                     <div className="score">score:{("   "+`${answer.reduce((sum,{rc})=>sum+rc,0)}`)} out of {answer.length}</div> 
                        <div className="container-fluid">
                    <div className="row">
                        {answer.map((item)=>{
                         return <div className="col-sm-12 col-md-12 col-lg-12" >
                                        <div className="tileContainer1">
                                            
                                        <div className="question">{item.question}</div>
                                       
                                        <div className="options">
                                        <div style={{display: "block"}}>
                                        
                                            <input type="radio"  />
                                            <span className="optiona">{item.optionA}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" />
                                            <span className="optionb">{item.optionB}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio" />
                                            <span className="optionc">{item.optionC}</span>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <input type="radio"  />
                                            <span className="optiond">{item.optionD}</span>
                                        </div>
                                        </div>
                                        <div  className="yoption">Your answer is: {" " +`${item.option}`}</div>
                                        {item.message=="wrong answer"?<div className="coptions" style={{color:"red"}}>{item.message}</div>:<div></div>}
                                        {item.message=="correct answer"?<div className="coptions" style={{color:"green"}}>{item.message}</div>:<div></div>}
                                        {item.message=="not answered"?<div className="coptions" style={{color:"blue"}}>{item.message}</div>:<div></div>}
                                        {item.message=="wrong answer" || item.message=="not answered"?<div className="ccoptions">correct answer is:{" "+`${item.opt_correct}`}</div>:<div></div>}
                                        </div>
                                    </div>
                       })}
                        
                    </div>
                </div>

                <div style={{position:'sticky',bottom: '10px'}}>
                
                    <button className="btn btn-sm btn-danger" style={{ float:"right"}} onClick={this.handlebShow}>back to instructions</button>
                </div>
                    </Modal>  
            </React.Fragment>
        )
    }
}
export default Questions;