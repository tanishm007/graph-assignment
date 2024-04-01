import React, { createContext, useState } from 'react';
import { useEffect } from 'react';



const GraphContext = createContext({

  modifiedDatasetA: null,
  modifiedDatasetC: null,
  handleAChange: () => {}, 
  handleCChange: () => {}, 


  
    modifiedFgData: null,
    setModifiedFgData: () => {},
    
  
});




const GraphProvider = ({ children }) => {



  const [modifiedFgData, setModifiedFgData] = useState(null);
  const [modifiedDatasetA, setModifiedDatasetA] = useState(null);
  const [modifiedDatasetC, setModifiedDatasetC] = useState(null);
  const [datasetData, setDatasetData] = useState([]);
  const [datasetbarData, setDatasetbarData] = useState([]);



  



  const handleAChange = () => {
    // ... your modification logic
    if (modifiedDatasetA) {
      // Modify existing modifiedDatasetA
      const updatedData = modifiedDatasetA.map(item => ({
          ...item,
          a: item.a * 1.1 // Increase 'a' by 10% on the current value
       }));
      setModifiedDatasetA(updatedData);

          

  } else {
      // First time modification from original dataset
      const duplicatedData = datasetData.map(item => ({
          ...item,
          a: item.a * 1.1 // Increase 'a' by 10%
      }));
      setModifiedDatasetA(duplicatedData);
  }

      
    

  };



  const handleCChange = () => {


    if(modifiedDatasetC)
    {
      const duplicatedData = modifiedDatasetC.map(item => {
        const modifiedC = item.c * 1.05; // Increase c by 5%
        return {
          ...item,
          c: modifiedC,
        };
      });

      setModifiedDatasetC(duplicatedData);
    }
    else{

      const duplicatedData = datasetData.map(item => {
        const modifiedC = item.c * 1.05; // Increase c by 5%
        return {
          ...item,
          c: modifiedC,
        };
      });

      setModifiedDatasetC(duplicatedData);

    }





  }


  const updateModifiedFg = async () => {
 
    
    if (modifiedDatasetA) {
        const newFgData = modifiedDatasetA.map(item => ({
            date: item.date,
            d: item.d, // Include original 'd' value
            e: item.e, // Include original 'e' value
            value: 8 * item.a + 3 * datasetbarData.find(barItem => barItem.date === item.date).h 
        }));
     
        setModifiedFgData(newFgData);
    } else {
        console.log('modifiedDatasetA not yet available');
    }
};

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
       
      } 
  };

  fetchData(); 


}, []);



  return (
    <GraphContext.Provider value={{ 
        modifiedDatasetA, 
        modifiedDatasetC,
        handleAChange,
        handleCChange ,
     
 
        modifiedFgData,
        setModifiedFgData, 
        updateModifiedFg,
    
     }}>
      {children}
    </GraphContext.Provider>
  );
}

export { GraphContext, GraphProvider };