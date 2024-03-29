import  { useState } from 'react';
import axios from 'axios'; // Or your preferred HTTP client
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { toast } from 'react-toastify';
import './Form.css'
import { Button } from 'react-bootstrap';

const DatasetForm = () => {
  const [formData, setFormData] = useState({

    date: '',
    a: '',
    b: '',
    c: '',
    d: '',
    e: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/dataset', formData);
      console.log('Success:', response);
      toast.success('Data sent successfully!');
      // Optionally clear the form or display a success message
    } catch (error) {
      console.error('Error:', error); 
      // Handle errors appropriately
    }
  };

  const handleUpdate = async (event, formData) => { 
    // ...

    try {
        const response = await axios.put(`http://localhost:3002/api/dataset?date=${formData.date}`, formData); 
        toast.success('Data updated succesfully!')
        console.log('Update Success:', response);
    } catch (error) {
        console.log("ERROR :",error)
    }
};

const handleDelete = async (event, formData) => {
    // ...

    try {
        const response = await axios.delete(`http://localhost:3002/api/dataset?date=${formData.date}`);
        console.log('Delete Success:', response);
        toast.success('Data deleted succesfully!')
    } catch (error) {
      console.log('ERROR :' , error)
       // ... 
    }
};

  return (
    <div className='form-container'>
        <ToastContainer />

    


    <form onSubmit={handleSubmit}>
    <h3>
                        Datasetfoo
                    </h3>
    
      <div>
        <label htmlFor="date">Date:</label> 
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="a">A:</label> 
        <input type="number" id="a" name="a" value={formData.a} onChange={handleChange} />
      </div>


      <div>
        <label htmlFor="b">B:</label> 
        <input type="number" id="b" name="b" value={formData.b} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="c">C:</label> 
        <input type="number" id="c" name="c" value={formData.c} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="d">D:</label> 
        <input type="number" id="d" name="d" value={formData.d} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="e">E:</label> 
        <input type="number" id="e" name="e" value={formData.e} onChange={handleChange} />
      </div>

      {/* ... Input fields for c, d, e  (similar structure) */}
      <div className='form-btns'>

      <Button type="submit">Submit</Button>
      <Button onClick={(event) => handleUpdate(event, formData)}>Update</Button>
      <Button onClick={(event) => handleDelete(event, formData)}>Delete</Button>
      </div>
    </form>
     
    </div>
  );
};

export default DatasetForm; 
