import React, { useState } from 'react';

import { datasetbar } from '../utils/data';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { GraphContext } from '../context/context';
import dataset from '../utils/data';
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

const calculateFa = (d) => 2 * d + 7;
const calculateFg = (a, h) => 8 * a + 3 * h;

const Graph_g = () => {
  const { modifiedDatasetA } = useContext(GraphContext)
  


  const dataFa = {
    labels: dataset.map(item => item.date),
    datasets: [
      {
        label: 'F_a',
        data: dataset.map(item => calculateFa(item.d)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.5
      }
    ]
  };

 

  const dataFg = {
    labels: dataset.map(item => item.date),
    datasets: [
        {
          label: 'F_g',
          data: datasetbar.map(item => {
            const a = dataset.find(fooItem => fooItem.date === item.date).a;
            const h = item.h;
           
            return calculateFg(a, h);
          }),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.5
        },
        ...(modifiedDatasetA
          ? [ 
              {
               
                label: 'Modified F_g', 
                data: modifiedDatasetA.map(item => {
                  const a = item.a; // Use modified 'a' value
                  const h = datasetbar.find(barItem => barItem.date === item.date).h;
                  return calculateFg(a, h);
                }),
                borderColor: 'rgb(255, 0, 255)', // New color
                backgroundColor: 'rgba(255, 0, 255, 0.5)',
                tension: 0.5 
              }
            ]
          : [])
      ]
  };

  return (
    
    <div> 
      <div>

        <div className="graph-container">
          <div className="graph">
            <Link to="/">
              home
            </Link>
           
            <Line options={options} data={dataFa} />
          </div>
          <div className="graph">
            <Line options={options} data={dataFg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph_g;
