
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
      text: 'f_x Line Chart',
    },
  },
};



// const calculateFx = (c, e) => 4 * c + e;
// const calculateFxa = (a, b, e) => 3*a + 5*b + e;





const Graph_x = ({dataset, formulas}) => {
  const { modifiedDatasetC, modifiedDatasetA, handleAChange, handleCChange } = useContext(GraphContext);

  console.log("formula from x" ,formulas)

  const formulaToFind = 'Fx1';

  const foundFormula = formulas.find(formula => formula.name === formulaToFind);

  const foundFormulax2 = formulas.find(formula => formula.name === 'Fx2');



  if (foundFormula) {
    console.log("Found formula:", foundFormula.expression);
    // Use foundFormula.expression, foundFormula.variables, etc.

  } else {
    console.log("Formula 'Fx1' not found.");
  }

  if (foundFormulax2) {
    console.log("Found formula:", foundFormulax2.expression);
    // Use foundFormula.expression, foundFormula.variables, etc.

  } else {
    console.log("Formula 'Fx2' not found.");
  }


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


  

        
  const labels = dataset.map(item => item.date);
  const dataset1 = dataset.map(item => {
    const values = { c: item.c, e: item.e }; // Assuming 'c' and 'e' exist
      return evaluateFormula(foundFormula, values);
     
  });

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
          data: modifiedDatasetC.map(item => {
            const values = { c: item.c, e: item.e }; // Assuming 'c' and 'e' exist
          return evaluateFormula(foundFormula, values);
          }),
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
            data: modifiedDatasetA.map(item => {

              const values = { a: item.a, e: item.e, b: item.b }; // Assuming 'c' and 'e' exist
          return evaluateFormula(foundFormulax2, values);

            }),
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
