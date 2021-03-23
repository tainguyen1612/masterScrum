import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react';
import { Link } from "react-router-dom";

const UserForEachFaculty = (props) => {
  
  const [student, setStudent] = useState([])
  const [error, setError] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  const currentUserId = props.match.params.facultyId;
  // console.log(currentUserId);
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {


        console.log(currentUserId);
        const single = await axios.get("/homeCoor/lstFaculty/"+currentUserId,config);
        setStudent(single.data)
        // console.log(coor.data.result);
        //console.log(privateData);
        
      } catch (error) {
        //localStorage.removeItem("authToken");
        setError("loi coor");
        
      }
    };

    fetchPrivateDate();
  }, []);



  const display = student.map(item => 
    <tr key={item.studentID}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>      
    </tr>  
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <table className="content-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {display}
      </tbody>
    </table>
  );
};

export default UserForEachFaculty;
