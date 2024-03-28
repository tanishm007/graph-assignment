import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './Navbar.css'


const Sidebar = () => {
  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px'}}>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
      <NavLink to='/' className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}> 
                    <svg className="bi me-2" width="16" height="16"><use xlink:href="#home"/></svg>
                    Home
                </NavLink>
      </li>
      <li>
      <NavLink to="/hidden" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <svg className="bi me-2" width="16" height="16"></svg>
                    Hidden Graphs
                </NavLink>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
          Orders
        </a>
      </li>
    
    </ul>
    <hr/>

 
  </div>
  )
}

export default Sidebar