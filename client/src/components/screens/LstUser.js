import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react'

const ListUser = () => {
  
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("authToken"),
        },
      };

      try {
        const {data}  = await axios.get("/homeAdmin/lstUser", config);
        setUser(data.data.result);
        console.log(data.data.result);
        //console.log(privateData);
        
      } catch (error) {
        //localStorage.removeItem("authToken");
        setError("You are not admin authorized please login");
        
      }
    };

    fetchPrivateDate();
  }, []);

  const display = user.map(item => 
    <tr key={item.userID}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.password}</td>
      <td>{item.role}</td>
      <td><button>Update</button></td>
      <td><button>Delete</button></td>
      
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
          <th>Password</th>
          <th>Role</th>
          <th colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        {display}
      </tbody>
    </table>
  );
};

export default ListUser;
