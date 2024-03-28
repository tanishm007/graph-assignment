import React, { createContext, useState } from 'react';
import dataset from '../utils/data';
import { datasetbar } from '../utils/data';

const GraphContext = createContext({

  modifiedDatasetA: null,
  modifiedDatasetC: null,
  handleAChange: () => {}, 
  handleCChange: () => {}, 
  showNotification: false,  // New state for notifications
    setNotification: () => {},
    modifiedFgData: null,
    setModifiedFgData: () => {},
});

const GraphProvider = ({ children }) => {

  const [modifiedFgData, setModifiedFgData] = useState(null);
  const [modifiedDatasetA, setModifiedDatasetA] = useState(null);
  const [modifiedDatasetC, setModifiedDatasetC] = useState(null);

  const [showNotification, setShowNotification] = useState(false);

  const setNotification = (message) => { 

    setShowNotification({message, display: true});
    setTimeout(() => setShowNotification(false), 5000); // Hide after 5 seconds
};

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

  const handleCChange = () => {

    const duplicatedData = dataset.map(item => {
      const modifiedC = item.c * 1.05; // Increase c by 5%
      return {
        ...item,
        c: modifiedC,
      };
    });

    setModifiedDatasetC(duplicatedData);

  }


  const updateModifiedFg = () => {
    if (modifiedDatasetA) {
        const newFgData = modifiedDatasetA.map(item => ({
            date: item.date,
            d: item.d, // Include original 'd' value
            e: item.e, // Include original 'e' value
            value: 8 * item.a + 3 * datasetbar.find(barItem => barItem.date === item.date).h 
        }));
     
        setModifiedFgData(newFgData);
    } else {
        console.log('modifiedDatasetA not yet available');
    }
};

  return (
    <GraphContext.Provider value={{ 
        modifiedDatasetA, 
        modifiedDatasetC,
        handleAChange,
        handleCChange ,
        showNotification,
        setNotification,
        modifiedFgData,
        setModifiedFgData, 
        updateModifiedFg,
     }}>
      {children}
    </GraphContext.Provider>
  );
}

export { GraphContext, GraphProvider };