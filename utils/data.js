// dataUtils.js
// ... other functions...

export const fetchAllData = async () => {
    try {
      const [datasetData, datasetbarData, formulas] = await Promise.all([
        fetchDataset(), 
        fetchDatasetbar(),
        fetchFormulas()
      ]);
  
      return { datasetData, datasetbarData, formulas };
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  };
  