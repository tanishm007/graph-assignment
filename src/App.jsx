
import { createRoot } from "react-dom/client";
import Home from '../pages/Home';
import Hidden from '../pages/Hidden';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphProvider } from '../context/context';
import ChartsContainer from "../components/ChartsContainer";
import Form from '../components/Form'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";

import './App.css'


const routes = createRoutesFromElements(
  <>
      
        <Route path='/' element={<ChartsContainer />} /> 
        <Route path='/hidden' element={<ChartsContainer />} />
        <Route path='/data' element={<ChartsContainer />} />

  </>
);

const router = createBrowserRouter(routes);

function App() {

  return (
    <GraphProvider>  // Wrap the RouterProvider here
      <RouterProvider router={router} /> 
    </GraphProvider>
  )
}

export default App
