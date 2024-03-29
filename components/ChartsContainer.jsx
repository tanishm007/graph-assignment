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
    
        fetchData(); 
    
    
    }, []);



    
    
    
    
    
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
                                <Graph_x dataset= {datasetData} datasetbar={datasetbarData}/>
                                <Graph_y dataset={datasetData} datasetbar={datasetbarData}/>
                               
                            </div>
                        )}
                        {location.pathname === '/hidden' && <Graph_g dataset={datasetData} datasetbar={datasetbarData}  />} 
                         {location.pathname === '/data' && <InputData/>} 
                    </div>
                    }            
                </GraphProvider>
            </div>
        </div>
    );
};

export default ChartsContainer;
