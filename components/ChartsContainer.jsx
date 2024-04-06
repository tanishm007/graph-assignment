// ChartsContainer.jsx 
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Navbar.css'
import { GraphProvider } from '../context/context';
import Graph_x from './Graph_x';
import Graph_y from './Graph_y';
import Graph_g from './Graph_g';
import Table from 'react-bootstrap/Table';
import DataTable from './DataTable'
import DataTableBar from './DataTableBar'

import Form from './Form'
import { useState, useEffect } from 'react';
import InputData from '../pages/InputData';






const ChartsContainer = () => {
    // ... other imports 
    const [datasetData, setDatasetData] = useState([]);
    const [datasetbarData, setDatasetbarData] = useState([]);
    const [formulas, setFormulas] = useState([]);
    const [showVariables, setShowVariables] = useState(false);
 
    useEffect(() => {
        const fetchData = async () => {
       // Set loading to true when fetching starts
            try {
                const datasetResponse = await fetch('http://localhost:3002/api/dataset');
                const datasetbarResponse = await fetch('http://localhost:3002/api/datasetbar');
    
                setDatasetData(await datasetResponse.json());
                setDatasetbarData(await datasetbarResponse.json());
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error (e.g., display an error message)
            } 
        };

        const fetchFormulas = async () => {
            try {
              const response = await fetch('http://localhost:3002/api/formulas');
              setFormulas(await response.json());
            } catch (error) {
              console.error('Error fetching formulas:', error);
            }
        };
        
        fetchData(); 
        fetchFormulas();
       
    
    }, []);

    function sendFormula(name, expression, variables, constants, dependencies) {
        fetch('http://localhost:3002/api/formulas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            expression,
            variables,
            constants,
            dependencies
          })
        })
        .then(response => {
          if (response.ok) {
            console.log('Formula sent successfully!');
            // Optionally, handle successful submission further here
          } else {
            throw new Error('Error sending formula: ' + response.status);
          }
        })
        .catch(error => {
          console.error('Error sending formula:', error);
          // Handle the error, e.g., display an error message to the user
        });
      }


/*
      const formulastore = [
        { name: 'Fx1', expression: '4c + e', variables: ['c', 'e'], dependencies: ['c', 'e'] },
        { name: 'Fx2', expression: '3a + 5b + e', variables: ['a', 'b', 'e'], dependencies: ['a', 'b', 'e'] },
        { name: 'Fa', expression: '2d + 7', variables: ['d'], dependencies: ['d'] },
        { name: 'Fy', expression: 'd + 2e + g', variables: ['d', 'e', 'g'], dependencies: ['d', 'e', 'a', 'h'] },
        { name: 'Fg', expression: '8a + 3h', variables: ['a', 'h'], dependencies: ['a', 'h'] }
      ];

      */
      
      function sendFormulas() {
        formulastore.forEach(formula => {
          sendFormula(formula.name, formula.expression, formula.variables, formula.constants, formula.dependencies);
        });
      }
      
      // Call the function to send formulas

   
    
    
    
    
    
    return (
        <div className="charts-container">
     
            <Navbar /> 
            <div className="main-content"> {/* New wrapper */}
                <GraphProvider >
                    <Sidebar /> 
                    {<div className="graphs">  
                        {location.pathname === '/' && ( 
                            <div>
                                
                               <div>
                                <div>
                                    Table Dataset
                                </div>
                               <DataTable  data={datasetData}/>
                               </div>
                               <div>
                                <div>
                                    Table Datasetbar
                                </div>
                               <DataTableBar  data={datasetbarData}/>
                               </div>
                                <Graph_x dataset= {datasetData} datasetbar={datasetbarData} formulas={formulas}/>
                                <Graph_y dataset={datasetData} datasetbar={datasetbarData}
                                allFormulas = {formulas}
                                showVariables={showVariables} 
                                setShowVariables={setShowVariables} 
                          
                                />
                               
                            </div>
                        )}
                        {location.pathname === '/hidden' && <Graph_g dataset={datasetData} datasetbar={datasetbarData} allFormulas={formulas} />} 
                         {location.pathname === '/data' && <InputData/>} 
                    </div>
                    }            
                </GraphProvider>
            </div>
        </div>
    );
};

export default ChartsContainer;
