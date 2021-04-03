import React from "react";
import axios from "axios";
import "./profile.css";
import { useState, useEffect, Component } from "react";
import { Label } from "@material-ui/icons";


export default function CoorProfile(match) {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };

  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const data  = await axios.get('/homeCoor/Profile', config);
        if(data) {
          console.log(data.data);
          setProfile(data.data);
          
        }
        
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);



  return (
<div className="data" >
      {/* <div className="register-screen" >
        <h1 className="title">Profile</h1>
        <form className="infor-form">
          <h4>Name: {profile.name}</h4>
          <h4>Email: {profile.email}</h4>
          <h4>Phone: {profile.phone}</h4>
        </form>
      </div> */}
      <h1 className="mb-0 title">Information</h1>
      <div className="student-profile py-4">
        <div className="container">
          <div className="row">
            <div className="card shadow-sm">
              <div className="card-header bg-transparent border-0">
              </div>
              <div className="card-body pt-0">
                <table className="table table-bordered">
                  <tr>
                    <th width="30%">Name</th>
                    <td width="2%">:</td>
                    <td>{profile.name}</td>
                  </tr>
                  <tr>
                    <th width="30%">Email</th>
                    <td width="2%">:</td>
                    <td>{profile.email}</td>
                  </tr>
                  <tr>
                    <th width="30%">Phone</th>
                    <td width="2%">:</td>
                    <td>{profile.phone}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}