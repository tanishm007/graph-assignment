
import { useContext } from 'react';
import { GraphContext } from '../context/context';
import { useEffect, useState } from 'react';
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
import { Button } from 'react-bootstrap';
import jStat from 'jstat';
import { create, all } from 'mathjs';




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



const Graph_y = ({dataset, datasetbar, allFormulas, setShowVariables, showVariables}) => {


  
  const config = {};
  const math = create(all, config);

  const evaluateFormula = (formula, values) => {
    try {
      const node = math.parse(formula.expression);
      const compiled = node.compile();
      return compiled.evaluate(values);
    } catch (error) {
      throw new Error(`Error evaluating formula '${formula.name}': ${error.message}`); 
    }
  };


  
  //const [showVariables, setShowVariables] = useState(false); 
  

  const { modifiedFgData, modifiedDatasetA, updateModifiedFg } = useContext(GraphContext);

  const foundFormulay = allFormulas.find(formula => formula.name === 'Fy');
  const foundFormulag = allFormulas.find(formula => formula.name === 'Fg')
  if(foundFormulay)
  console.log("fy formula", foundFormulay.dependencies);

  if(foundFormulag)
  console.log("fg formula", foundFormulag);

  
  useEffect(() => {
    
    updateModifiedFg();

}, [modifiedDatasetA]);
  
  const labels = dataset.map(item => item.date);
  
  // Calculate fy values
  const dataset1 = [];


  const allVariables = new Set(); 


  /*
  const extractVariables = (formulaName) => {
    const formula = formulas[formulaName];
    formula.dependencies.forEach((dep) => {
      allVariables.add(dep);
      if (dep in formulas) { // Check if the dependency is another formula
        extractVariables(dep);  // Recursively extract
      }
    });
  };
  extractVariables("fy"); 

  */
 
 if (foundFormulay) {
   foundFormulay.dependencies.forEach(dep => allVariables.add(dep));
  }
  console.log("all vairbles", Array.from(allVariables));
 

  
  dataset.forEach(item => {
    const foundBarData = datasetbar.find(barItem => barItem.date === item.date);
    if (foundBarData) {

  
   // const gvalue = calculateFg(item.a, foundBarData.h)
   
   const gvalue = foundFormulag ? evaluateFormula(foundFormulag, {a: item.a, h: foundBarData.h}) : null; 
   const fy = foundFormulay ? evaluateFormula(foundFormulay, {d: item.d, e:item.e, g:gvalue }) : null;
  // const fy = calculateFy(item.d, item.e, gvalue);


  
  
   
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
let maxDeviation = -Infinity; 
let spikeDataPoint = null; 
const deviations = dataset1.map((fyValue, index) => {
  const predictedFy = slope * xAxisData[index] + intercept;
  const deviation = fyValue - predictedFy; 
  if (deviation > maxDeviation) { // Update only if a larger deviation is found
      maxDeviation = deviation; 
      spikeDataPoint = { x: xAxisData[index], y: fyValue }; 
  }
  return deviation; 
});

// Calculate deviations and find the largest

    maxDeviation = Math.max(...deviations);
  const spikeIndex = deviations.indexOf(maxDeviation);
  const spikeValue = dataset1[spikeIndex];

  console.log("Highest Spike Value:", spikeValue);

  // finding correlation coefficients

  const correlations = Array.from(allVariables).map((variable) => {
    // Combine data for correlation, prioritizing dataset
    const combinedData = dataset.map((item, index) => {
      if (variable in item) {
       
        return item[variable]; 
      } else {
        const foundBarData = datasetbar.find((barItem) => barItem.date === item.date);
        return foundBarData ? foundBarData[variable] : null; 
      }
    });

    console.log("combined data", combinedData)

  
  
    const corr = jStat.corrcoeff(dataset1, combinedData); 
    return { variable, correlation: corr };
  });

  console.log("ma", modifiedDatasetA)

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(143, 0, 255)",
    "rgb(0, 128, 255)",
    "rgb(255, 159, 64)",
    "rgb(75, 192, 192)",
  ];



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
                data: modifiedFgData.map(item => {
                  const value = {d: item.d, e:item.e, g: item.value};

                  return evaluateFormula(foundFormulay, value)
                }),
                // ... other styles
                borderColor: 'rgb(143, 0, 255)',
                backgroundColor: 'rgba(143, 0, 255, 0.5)',
                tension: 0.5
            }
        ] : []),

        ...(showVariables ?
          Array.from(allVariables).map((variable, index) => {
            const corr = correlations.find((c) => c.variable === variable).correlation;
            console.log("corr", corr)
      
            // Conditional Data Source Selection
            
            const dataToUse = modifiedDatasetA
            ? modifiedDatasetA.map(modItem => 
                    modItem[variable] !== undefined 
                        ? modItem[variable] 
                        : dataset.find(item => item.date === modItem.date)[variable] !== undefined
                            ? dataset.find(item => item.date === modItem.date)[variable]
                            : datasetbar.find(barItem => barItem.date === modItem.date)?.[variable]  // Check datasetbar only as the last resort
            )
            : dataset.map(item => 
                    item[variable] !== undefined
                        ? item[variable]
                        : datasetbar.find(barItem => barItem.date === item.date)?.[variable] // Check datasetbar only as the last resort 
             );
        
                             
      
            return {
              label: `${variable} (corr: ${corr.toFixed(2)})`,
              data: dataToUse, 
              borderColor: colors[index % colors.length],
              backgroundColor: `${colors[index % colors.length]}4D`,
              tension: 0.5,
            };
          })
          : []),
          { // Dataset for the Spike
            label: 'Spike',
            data: spikeDataPoint ? [spikeDataPoint] : [], 
            backgroundColor: 'black',
            borderColor: 'black',
            pointRadius: 5, // Increase dot size for visibility 
        },
    ],
};


  return (
    
    <div> 
      <div>
      <Button onClick={() => setShowVariables(true)}>find Spike</Button>
       
        <Line options={options} data={data} />
      </div>

    </div>
  );
};

export default Graph_y;
