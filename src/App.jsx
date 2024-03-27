import { useState } from 'react'
import { createRoot } from "react-dom/client";
import Home from '../pages/Home';
import Hidden from '../pages/Hidden';
import './App.css'
import { GraphProvider } from '../context/context';
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
  <Route path='/' element={<Home />}>
    
  </Route>

    
  <Route path='/hidden' element={<Hidden />} />

  </>
);

const router = createBrowserRouter(routes);

function App() {



  return (
    <RouterProvider router = {router} />
  )
}

export default App
