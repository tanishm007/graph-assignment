import React, { useState } from 'react';
import Graph_x from '../components/Graph_x';
import Graph2 from '../components/Graph2';

import { GraphProvider } from '../context/context';
import { Link } from 'react-router-dom'; 

const Home = () => {

  return (
    <div> 
      <div>

        <Link to="/hidden" >btn</Link>
        
      <GraphProvider> 
            <Graph_x /> 
            <Graph2/>
        </GraphProvider> 
    
    
   
      </div>
    </div>
  )
}
 


export default Home;
