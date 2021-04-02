import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react';
import { Link } from "react-router-dom";

const CoorScreen = ({match}) => {
  
  const [error, setError] = useState("");
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
      };

      try {
        const {data}  = await axios.get("/homeCoor/Faculty", config);
        setFaculty(data.data);
        console.log(data.data);
        //console.log(privateData);
        
      } catch (error) {
        
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);



  const display = faculty.map((item,index) => 
    <tr key={index}>
      <td data-label="Faculty Name">{item.facultyName}</td>
      <td data-label="Start Date">{item.startDay}</td>
      <td data-label="End Date">{item.endDay}</td>
      <td><Link to={`/user_for_faculty/${item._id}`} color="warning" className="btn-add btn-warning mr-1">Student</Link></td>
      <td><Link to={`/submit_for_faculty/${item._id}`} color="warning" className="btn-add btn-warning mr-1">Article</Link></td>
      
    </tr>  
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="data">
      <h1 className="title">Faculty</h1>
        <table className="content-table">
          <thead>
            <tr>
              <th>Faculty Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {display}
          </tbody>
      </table>
    </div>
  );
};

export default CoorScreen;
