import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react';
import { Link } from "react-router-dom";

const PrivateScreen = () => {
  
  const [error, setError] = useState("");
  const [faculty, setFaculty] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  useEffect(() => {
    const fetchPrivateDate = async () => {


      try {
        const {data}  = await axios.get("/homeAdmin/lstFaculty", config);
        setFaculty(data.data);
        //console.log(privateData);
        
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const deleteHandle = async (id) => {
    try{
      const deleteRecord = await axios.delete("/homeAdmin/lstFaculty/"+id, config);
    }catch (error) {
      setError("Error Delete");
    }

  }

  const display = faculty.map((item,index) => 
    <tr key={index}>
      <td>{item.facultyName}</td>
      <td>{item.coordinator.name}</td>
      <td>{item.startDay}</td>
      <td>{item.endDay}</td>
      <td><Link to={`/edit_faculty/${item._id}`} color="warning" className="btn btn-warning mr-1">Edit</Link></td>
      <td><Link to={"/"} onClick={() => deleteHandle(item._id)} color="warning" className="btn btn-warning mr-1">Delete</Link></td>
    </tr>  
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <table className="content-table">
      <thead>
        <tr>
          <th>Faculty Title</th>
          <th>Coordinator Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        {display}
      </tbody>
    </table>
  );
};

export default PrivateScreen;