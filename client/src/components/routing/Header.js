import React, { useState, useEffect } from "react";
//import { Button } from "../form/Button";
import "../routing/Header.css";
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header(props) {
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchPrivateDate = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("authToken"),
            },
          };
    
          try {
            const {data}  = await axios.get("/checkRole", config);
            setRole(data.data);
            console.log(data.data);
            //console.log(privateData);
            
          } catch (error) {
            
            
          }
        };
    
        fetchPrivateDate();
      }, []);

    const adminRouter = () =>{
        return(
            <>
                <li className="hea-item"><Link className="hea-links" to="/">Faculty</Link></li>
                <li className="hea-item"><Link className="hea-links" to="/add_faculty">Create Faculty</Link></li>
                <li className="hea-item"><Link className="hea-links" to="/list_user">Account</Link></li>
                <li className="hea-item"><Link className="hea-links" to="/add_user">Create Account</Link></li>
            </>
        )
    };

    const coordinatorRouter = () =>{
        return(
            <>
                <li className="hea-item"><Link className="hea-links" to="/">Faculty</Link></li>
                <li className="hea-item"><Link className="hea-links" to="/coo_profile">Profile</Link></li>
            </>
        )
    };

    const studentRouter = () =>{
        return(
            <>
                <li className="hea-item"><Link className="hea-links" to="/">Faculty</Link></li>
                <li className="hea-item"><Link className="hea-links" to="/stu_profile">Profile</Link></li>
            </>
        )
    };

    const managerRouter = () =>{
        return(
            <>
                <li><Link className="hea-links" to="/">Chart Analysis</Link></li>
                <li><Link className="hea-links" to="/article">Article</Link></li>
            </>
        )
    };

    const guestRouter = () =>{
        return(
            <>
                <li><Link className="hea-links" to="/">Dashboard</Link></li>
            </>
        )
    };
    const logoutUser = () => {
        localStorage.removeItem("authToken");
        props.history.push("/login") 
    }
    
  return (
      <nav className="header">
        <div className="header-container">
          <a href="" className="header-logo" >
            GW <i class="far fa-university"></i>
          </a>

          <div className="menu-icon">
            <i className="fas fa-times" />
          </div>

          <ul className="hea-menu">
            {role==="admin" && adminRouter()}
            {role==="coordinator" && coordinatorRouter()}
            {role=="student" && studentRouter()}
            {role==="manager" && managerRouter()}
            <li className="hea-item" onClick={() => logoutUser()}><a className="hea-links">Logout</a></li>
          </ul>
        </div>
      </nav>
  );
}

export default Header;