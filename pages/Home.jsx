import React, { useState } from 'react';
import Graph_x from '../components/Graph_x';
import Graph_y from '../components/Graph_y';

import { GraphProvider } from '../context/context';
import { Link } from 'react-router-dom'; 

const Home = () => {
  const { showNotification } = useContext(GraphContext);
  return (
    <div> 
      <div>

        <Link to="/hidden" >btn</Link>

       
        
      <GraphProvider> 
            <Graph_x /> 
            <Graph_y/>
          
        </GraphProvider> 
    
    
   
      </div>
    </div>
  )
}
 


export default Home;
