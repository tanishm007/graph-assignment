import React, { useState } from 'react';
import dataset from '../utils/data';
import {datasetbar} from '../utils/data';
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

const calculateFy = (d, e, g) => d + 2 * e + g;

const labels = dataset.map(item => item.date);

// Calculate fy values
const dataset1 = [];

dataset.forEach(item => {
  const foundBarData = datasetbar.find(barItem => barItem.date === item.date);
  if (foundBarData) {
    console.log(foundBarData.g)
    const fy = calculateFy(item.d, item.e, foundBarData.g);
    console.log(item.d)
   
    dataset1.push(fy);
  } else {
    console.log(`No corresponding data found in datasetbar for date: ${item.date}`);
    dataset1.push(null); // or any other appropriate value
  }
});

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

const Graph2 = () => {
  return (
    <div> 
      <div>
        {/* Add buttons to change datasets if necessary */}
        
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Graph2;
