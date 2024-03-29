
import { useState, useEffect, useContext } from 'react';
import { GraphProvider } from '../context/context';

export function useFetchData() {
    const [datasetData, setDatasetData] = useState([]);
    const [datasetbarData, setDatasetbarData] = useState([]);

    const {setIsLoading} = useContext(GraphProvider)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true when fetching starts
            try {
                const datasetResponse = await fetch('http://localhost:3002/api/dataset');
                const datasetbarResponse = await fetch('http://localhost:3002/api/datasetbar');

                setDatasetData(await datasetResponse.json());
                setDatasetbarData(await datasetbarResponse.json());
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error (e.g., display an error message)
            } finally {
                setIsLoading(false); // Set loading to false in any case
            }
        };

        fetchData(); 


    }, []);

    return { datasetData, datasetbarData };
}
