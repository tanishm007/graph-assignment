import React, { useState } from 'react';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import './Form.css'

const DatasetbarForm = () => {
    const [formData, setFormData] = useState({
        date: '',
        e: '',
        g: '',
        h: ''
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
            const response = await axios.post('http://localhost:3002/api/datasetbar', formData);
            console.log('Success:', response);
            toast.success('Data of DatasetBar sent successfully!');
        } catch (error) {
            console.error('Error:', error); 
        }
    };

    // Implement handleUpdate and handleDelete similar to DatasetForm

    const handleUpdate = async (event, formData) => { 
        // ...
    
        try {
            const response = await axios.put(`http://localhost:3002/api/datasetbar?date=${formData.date}`, formData); 
            toast.success('Data of Datasetbar updated succesfully!')
            console.log('Update Success:', response);
        } catch (error) {
            console.log("ERROR :",error)
        }
    };
    
    const handleDelete = async (event, formData) => {
        // ...
    
        try {
            const response = await axios.delete(`http://localhost:3002/api/datasetbar?date=${formData.date}`);
            console.log('Delete Success:', response);
            toast.success(`Data of Datasetbar of date: ${formData.data} deleted succesfully!`)
        } catch (error) {
          console.log('ERROR :' , error)
           // ... 
        }
    };
    
    return (
        <>
  
        <div className='form-container'>
            
            <ToastContainer />

            
       
                <form onSubmit={handleSubmit}>
                    <h3>
                        DatasetBar
                    </h3>

                <div>
        <label htmlFor="date">Date:</label> 
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="a">e:</label> 
        <input type="number" id="e" name="e" value={formData.e} onChange={handleChange} />
      </div>


      <div>
        <label htmlFor="f">f:</label> 
        <input type="number" id="f" name="f" value={formData.f} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="h">h:</label> 
        <input type="number" id="h" name="h" value={formData.h} onChange={handleChange} />
      </div>
                    {/* Input fields for date, e, g, h */}
                    <div className='form-btns'>
                        <Button type="submit">Submit</Button>
                        <Button onClick={(event) => handleUpdate(event, formData)}>Update</Button>
                          <Button onClick={(event) => handleDelete(event, formData)}>Delete</Button>
                
                    </div>
                </form>
       
        </div>
        </>
    );
};

export default DatasetbarForm;
