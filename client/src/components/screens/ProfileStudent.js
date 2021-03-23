import React from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { useState, useEffect, Component } from "react";
import { Label } from "@material-ui/icons";


export default function StuProfile(match) {
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
        const data  = await axios.get("/homeStudent/Profile", config);
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
    <div className="register-screen" >
      <form className="register-screen__form">
      <h3 className="register-screen__title">Profile Student</h3>
        <h4>Name: {profile.name}</h4>
        <h4>Email: {profile.email}</h4>
        <h4>Phone: {profile.phone}</h4>
      </form>
    </div>
  );
}