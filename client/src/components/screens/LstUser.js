import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react'
import {Link} from 'react-router-dom'

const ListUser = () => {
  
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  useEffect(() => {
    const fetchPrivateDate = async () => {
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

  const deleteHandle = async (id) => {
    try{
      const deleteRecord = await axios.delete("/homeAdmin/lstUser/"+id, config);
      window.location.reload();
    }catch (error) {
      setError("Error Delete");
    }

  }

  const display = user.map(item => 
    <tr key={item.userID}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td className="pass" >{item.password}</td>
      <td>{item.role}</td>
      <td><Link to={`/edit_user/${item._id}`} className="btn-add">Update</Link></td>
      <td><button className="btn-delete" onClick={(e) => deleteHandle(item._id)}>Delete</button></td>
    </tr>  
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="data">
      <h1 className="title">Account</h1>
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
    </div>
  );
};

export default ListUser;
