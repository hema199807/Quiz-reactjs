import React from 'react';
import '../styles/instructions.css';
import {withRouter} from 'react-router-dom';

class Instructions extends React.Component{
   
    handleClick=()=>{
        this.props.history.push('/QQ')
    }
    render(){
        return(
            <React.Fragment>
              <h2 style={{textAlign:"center",marginTop:"12%"}}>Instructions</h2>
              <div style={{textAlign:"center"}}><br/>
                  <p style={{textAlign:"left",marginLeft:"42%"}}>1.Quiz contain 10mcq questions and Don't refresh the page while taking test</p>
                   <p style={{textAlign:"left",marginLeft:"42%"}}>2.once click on next, candidate not allowed to revisit </p>
                   <p style={{textAlign:"left",marginLeft:"42%"}}>3.No negative Marking and All questions should be answered</p>
              </div><br/>
              <button className="btn btn-sm btn-primary " style={{marginLeft:"50%"}} onClick={this.handleClick}>Start Test</button>
            </React.Fragment>
        )
    }
}
export default withRouter(Instructions);