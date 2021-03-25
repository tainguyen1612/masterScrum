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
              <a href="/"><i className="fas fa-book-open"></i><span>Faculty</span></a>
              {/* <Link className="hea-links" to="/">Faculty</Link> */}
              <a href="/add_faculty"><i className="fas fa-book-open"></i><span>Create Faculty</span></a>
              {/* <Link className="hea-links" to="/add_faculty">Create Faculty</Link> */}
              <a href="/list_user"><i className="fas fa-user"></i><span>User Account</span></a>
              {/* <Link className="hea-links" to="/list_user">Account</Link> */}
              <a href="/add_user"><i className="fas fa-user-plus"></i><span>Create User</span></a>
              {/* <Link className="hea-links" to="/add_user">Create Account</Link> */}
            </>
        )
    };

    const coordinatorRouter = () =>{
        return(
            <>
                <a href="/"><i className="fas fa-book-open"></i><span>Faculty</span></a>
                {/* <Link className="hea-links" to="/">Faculty</Link> */}
                <a href="/coo_profile"><i className="far fa-address-card"></i><span>Profile</span></a>
                {/* <Link className="hea-links" to="/coo_profile">Profile</Link> */}
            </>
        )
    };

    const studentRouter = () =>{
        return(
            <>
                <a href="/"><i className="fas fa-book-open"></i><span>Faculty</span></a>
                {/* <Link className="hea-links" to="/">Faculty</Link> */}
                <a href="/stu_profile"><i className="far fa-address-card"></i><span>Profile</span></a>
                {/* <Link className="hea-links" to="/stu_profile">Profile</Link> */}
            </>
        )
    };

    const managerRouter = () =>{
        return(
            <>
                <a href="/"><i className="fas fa-chart-line"></i><span>Chart</span></a>
                {/* <li><Link className="hea-links" to="/">Chart Analysis</Link></li> */}
                <a href="/article"><i className="fas fa-newspaper"></i><span>Article</span></a>
                {/* <li><Link className="hea-links" to="/article">Article</Link></li> */}
            </>
        )
    };

    const guestRouter = () =>{
        return(
            <>  
                <a href="/"><i className="fas fa-newspaper"></i><span>Article</span></a>
                {/* <li><Link className="hea-links" to="/">Dashboard</Link></li> */}
            </>
        )
    };
    const logoutUser = () => {
        localStorage.removeItem("authToken");
        props.history.push("/login") 
    }
    
  return (
    <div>
      <input type="checkbox" id="menu"></input>
      <nav>
        <label className="green">GreenWich</label>
        <ul>
            <li><a onClick={() => logoutUser() }>Logout</a></li>
        </ul>
        <label for="menu" className="menu-bar">    
          <i className="fa fa-bars"></i> 
        </label>
      </nav> 
      <div class="side-menu">
        {role==="admin" && adminRouter()}
        {role==="coordinator" && coordinatorRouter()}
        {role=="student" && studentRouter()}
        {role==="manager" && managerRouter()}
        {role==="guest" && guestRouter()}
        <a onClick={() => logoutUser()} class="Logout"><span>Logout</span></a>
      </div>
    </div>


  );
}

export default Header;