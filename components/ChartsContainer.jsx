import React from 'react';
import Graph_x from './Graph_x';
import Graph_g from './Graph_g';
import { useLocation } from 'react-router-dom';
import { GraphProvider } from '../context/context';
import Graph_y from './Graph_y';

const ChartsContainer = () => {
    const location = useLocation();

    return (
        <div className="charts-container">
            <GraphProvider>

            {location.pathname === '/' && ( 
                    <>
                  
                      <Graph_x />
                      <Graph_y/>
                    </>
                )}

            {location.pathname === '/hidden' && <Graph_g />}  
            </GraphProvider>
        </div>
    );
};

export default ChartsContainer;