import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormDataComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/save_data', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        fetchData();
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_data');
      if (response.status === 200) {
        setTableData(response.data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div><br/>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div><br/>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div><br/>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <h2 className="mt-4">Table Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormDataComponent;