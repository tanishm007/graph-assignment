
import { useContext } from 'react';
import { GraphContext } from '../context/context';
import { useEffect } from 'react';
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

import moment from 'moment';

import { SimpleLinearRegression } from 'ml-regression-simple-linear';




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
      text: 'f_y Line Chart',
    },
  },
};

const calculateFy = (d, e, g) => d + 2 * e + g;
const calculateFg = (a, h) => 8*a + 3*h;








const Graph_y = ({dataset, datasetbar}) => {

  

  

  const { modifiedFgData, modifiedDatasetA, updateModifiedFg } = useContext(GraphContext);

  useEffect(() => {
    
    updateModifiedFg();

}, [modifiedDatasetA]);
  
  const labels = dataset.map(item => item.date);
  
  // Calculate fy values
  const dataset1 = [];


  
  dataset.forEach(item => {
    const foundBarData = datasetbar.find(barItem => barItem.date === item.date);
    if (foundBarData) {


    
  
    const gvalue = calculateFg(item.a, foundBarData.h)
    const fy = calculateFy(item.d, item.e, gvalue);
  
   
    dataset1.push(fy);
  } else {
    console.log(`No corresponding data found in datasetbar for date: ${item.date}`);
    dataset1.push(null); // or any other appropriate value
  }
});


const xAxisData = dataset.map((item) => moment(item.date).valueOf()); 



// Perform linear regression


const regression = new SimpleLinearRegression(xAxisData, dataset1); 
const slope = regression.slope;
const intercept = regression.intercept;

// Calculate deviations (adjust this based on how you want to find spikes)
const deviations = dataset1.map((fyValue, index) => {
 const predictedFy = slope * xAxisData[index] + intercept;
 return fyValue - predictedFy;
});

// Calculate deviations and find the largest

  const maxDeviation = Math.max(...deviations);
  const spikeIndex = deviations.indexOf(maxDeviation);
  const spikeValue = dataset1[spikeIndex];

  console.log("Highest Spike Value:", spikeValue);



  const data = {
    labels,
    datasets: [
      {
        label: 'Original Data',
        data: dataset1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.5
      },
      ...(modifiedFgData ? [ 
        {
            label: 'Modified F_y',
            // Use values from modifiedFgData
            data: modifiedFgData.map(item => calculateFy(item.d, item.e, item.value)),
            // ... other styles
            borderColor: 'rgb(143, 0, 255)',
            backgroundColor: 'rgba(143, 0, 255, 0.5)',
            tension: 0.5
        }
    ] : [])
  
    ],
  };


  return (
    
    <div> 
      <div>
       
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Graph_y;
