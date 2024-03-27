import React, { createContext, useState } from 'react';
import dataset from '../utils/data';

const GraphContext = createContext();

const GraphProvider = ({ children }) => {
  const [modifiedDatasetA, setModifiedDatasetA] = useState(null);

  const handleAChange = () => {
    // ... your modification logic
    console.log('context called')
    const duplicatedData = dataset.map(item => {
        const modifiedA = item.a * 1.1; // Increase a by 10%
        return {
          ...item,
          a: modifiedA,
        };
      });
  
      setModifiedDatasetA(duplicatedData);
    

  };

  return (
    <GraphContext.Provider value={{ modifiedDatasetA, handleAChange }}>
      {children}
    </GraphContext.Provider>
  );
}

export { GraphContext, GraphProvider };