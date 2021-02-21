import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Instructions from '../component/intsructions';
import Questions from '../component/Questions';


const Router=()=>{
    return(
        <BrowserRouter>
       
        <Route exact path="/" component={Instructions}/>
        <Route path="/QQ" component={Questions}/>
        
        
        </BrowserRouter>
    )
}
export default Router;