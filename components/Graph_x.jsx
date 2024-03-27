import React, { useState } from 'react';
import dataset from '../utils/data';

import { useContext } from 'react';
import { GraphContext } from '../context/context';

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

const labels = dataset.map(item => item.date);
const dataset1 = dataset.map(item => calculateFx(item.c, item.e));

export const data = {
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

const Graph_x = () => {
  const [modifiedDatasetC, setModifiedDatasetC] = useState(null);
  const [modifiedDatasetA, setModifiedDatasetA] = useState(null);

  const { handleAChange } = useContext(GraphContext);

  const duplicateDatasetAndModifyC = () => {
    const duplicatedData = dataset.map(item => {
      const modifiedC = item.c * 1.05; // Increase c by 5%
      return {
        ...item,
        c: modifiedC,
      };
    });

    setModifiedDatasetC(duplicatedData);
  };

  const duplicateDatasetAndModifyA = () => {

    handleAChange();
    
    const duplicatedData = dataset.map(item => {
      const modifiedA = item.a * 1.1; // Increase a by 10%
      return {
        ...item,
        a: modifiedA,
      };
    });

    setModifiedDatasetA(duplicatedData);
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
      <div>

      <button type="button" className="btn" onClick={duplicateDatasetAndModifyC}>
          Change c by 5%
        </button>
        <button type="button" className="btn" onClick={duplicateDatasetAndModifyA}>
          Change a by 10%
        </button>
        
   

        <Line options={options} data={{...data, datasets: mergedDataset}} />

   
      </div>
    </div>
  );
};

export default Graph_x;
