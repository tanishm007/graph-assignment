
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { GraphContext } from '../context/context';


import { ToastContainer, toast } from 'react-toastify';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
;



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};



const calculateFx = (c, e) => 4 * c + e;
const calculateFxa = (a, b, e) => 3*a + 5*b + e;





const Graph_x = ({dataset}) => {
  const { modifiedDatasetC, setModifiedDatasetC, modifiedDatasetA, setModifiedDatasetA, handleAChange, handleCChange,  updateModifiedFg } = useContext(GraphContext);
  
  

        
  const labels = dataset.map(item => item.date);
  const dataset1 = dataset.map(item => calculateFx(item.c, item.e));

  const data = {
    labels,
    datasets: [
      {
        label: 'Original Data',
        data: dataset1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.5
      }
    ],
  };
        
        
        const duplicateDatasetAndModifyC = () => {
          
        handleCChange();
        
        toast.success('F_x graph has been updated!', {
          position: "top-center" // Position setting
        });
        
      };
      
      const duplicateDatasetAndModifyA = () => {

        
       
      
        handleAChange();

    

        toast.success('F_g graph has been updated!', {
          position: "top-center" // Position setting
        });
        
        
        
        
      };
      
      
      
      const mergedDataset = [
        ...data.datasets,
    ...(modifiedDatasetC
      ? [
        {
          label: 'Change in c by 5%',
          data: modifiedDatasetC.map(item => calculateFx(item.c, item.e)),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.5
          }
        ]
        : []),
        ...(modifiedDatasetA
      ? [
          {
            label: 'Change in a by 10%',
            data: modifiedDatasetA.map(item => calculateFxa(item.a, item.b, item.e)),
            borderColor: 'rgb(255, 0, 255)',
            backgroundColor: 'rgba(255, 0, 255, 0.5)',
            tension: 0.5
          }
        ]
        : [])
      ];
      
      return (
        <div> 
      <ToastContainer/>
      <div>

      <Button variant="primary" onClick={duplicateDatasetAndModifyC}>Change c by 5%</Button>{' '}
      <Button variant="primary" onClick={duplicateDatasetAndModifyA}>Change a by 10%</Button>{' '}

  
  


        
   
     
        <Line options={options} data={{...data, datasets: mergedDataset}} />

   
      </div>
    </div>
  );
};

export default Graph_x;
