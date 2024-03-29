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
import dataset, { datasetbar } from '../utils/data';
import Form from './Form'
import InputData from '../pages/InputData';




const ChartsContainer = () => {
    // ... other imports 

    return (
        <div className="charts-container">
            <Navbar /> 
            <div className="main-content"> {/* New wrapper */}
                <GraphProvider>
                    <Sidebar /> 
                    <div className="graphs">  {/* New wrapper for graphs */}
                        {location.pathname === '/' && ( 
                            <div>
                                
                               <div>
                                <div>
                                    Table Dataset
                                </div>
                               <DataTable  data={dataset}/>
                               </div>
                               <div>
                                <div>
                                    Table Datasetbar
                                </div>
                               <DataTableBar  data={datasetbar}/>
                               </div>
                                <Graph_x />
                                <Graph_y/>
                               
                            </div>
                        )}
                        {location.pathname === '/hidden' && <Graph_g />} 
                         {location.pathname === '/data' && <InputData/>} 
                    </div>
                </GraphProvider>
            </div>
        </div>
    );
};

export default ChartsContainer;
