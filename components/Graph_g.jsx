

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

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
      text: 'Chart.js Line Chart',
    },
  },
};



const Graph_g = ({dataset, datasetbar, allFormulas}) => {
  const { modifiedDatasetA } = useContext(GraphContext)



  const foundFormulaa = allFormulas.find(formula => formula.name === 'Fa');
  const foundFormulag = allFormulas.find(formula => formula.name === 'Fg')
  if(foundFormulaa)
  console.log("fy formula", foundFormulaa);

  if(foundFormulag)
  console.log("fg formula", foundFormulag);


  
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


  const dataFa = {
    labels: dataset.map(item => item.date),
    datasets: [
      {
        label: 'F_a',
        data: dataset.map(item => {
          const value = {d: item.d}
          return evaluateFormula(foundFormulaa, value)}),
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
            const aval = dataset.find(fooItem => fooItem.date === item.date).a;
            const h = item.h;
            const value = {a:aval, h: item.h}
            
           
         //   return calculateFg(a, h);
            return evaluateFormula(foundFormulag, value)
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
                  const aval = item.a; // Use modified 'a' value
                  const hval = datasetbar.find(barItem => barItem.date === item.date).h;
      
                  const value = {a: aval, h:hval}
                  return evaluateFormula(foundFormulag, value);
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
