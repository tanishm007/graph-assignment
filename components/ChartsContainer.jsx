// ChartsContainer.jsx 
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Navbar.css'
import { GraphProvider } from '../context/context';
import Graph_x from './Graph_x';
import Graph_y from './Graph_y';
import Graph_g from './Graph_g';


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
                            <>
                                <Graph_x />
                                <Graph_y/>
                            </>
                        )}
                        {location.pathname === '/hidden' && <Graph_g />} 
                    </div>
                </GraphProvider>
            </div>
        </div>
    );
};

export default ChartsContainer;
