import React from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";

export default function ViewSubmit(props) {
  const [error, setError] = useState("");
  const [report, setReport] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  const currentId = props.match.params.facultyID
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const data  = await axios.get("/homeStudent/lstFaculty/report/list/"+currentId, config);
        setReport(data.data);
        //console.log(privateData);
        
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);



  const display = report.map((item,index) => 
    <tr key={index}>
      <td>{item.facultyID.facultyName}</td>
      <td onClick={e => window.open(item.reportUrl, "_blank")}><i className="fas fa-file-pdf"></i></td>
      <td>{item.point}</td>
      <td>{item.feedback}</td>
      <td>{item.CreateAt}</td>
      <td><Link to={`//${item._id}`} color="warning" className="btn-add btn-warning mr-1">ReSubmit</Link></td>
      <td><Link className="btn-delete">Delete</Link></td>
      
    </tr>  
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="data">
      <h1 className="title">Faculty / Article</h1>
      <table className="content-table">
        <thead>
          <tr>
            <th>Faculty Title</th>
            <th>Report</th>
            <th>Score</th>
            <th>Feedback</th>
            <th>Time Submit</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {display}
        </tbody>
      </table>
    </div>
  );
}