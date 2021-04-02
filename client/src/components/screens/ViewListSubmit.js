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
  console.log(currentId);
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const data  = await axios.get("/homeStudent/lstFaculty/report/list/"+currentId, config);
        setReport(data.data);
        
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const deleteHandle = async (id) => {
    try{
      const deleteRecord = await axios.delete(`/homeStudent/lstFaculty/report/delete/${currentId}/${id}`, config);
      window.location.reload();
    }catch (error) {
      setError("Error Delete");
    }

  }

  const display = report.map((item,index) => 
    <tr key={index}>
      <td data-label="Title">{item.title}</td>
      <td data-label="Article" onClick={e => window.open(item.reportUrl, "_blank")}><span style={{cursor:"pointer", color:"blue"}}>{item.title}.pdf</span></td>
      <td data-label="Status">{item.reportStatus}</td>
      <td data-label="Point">{item.point}</td>
      <td data-label="Feedback">{item.feedback}</td>
      <td data-label="Time Submit">{item.CreateAt}</td>
      <td><Link to={`/reSubmit/${item._id}`} color="warning" className="btn-add btn-warning mr-1">ReSubmit</Link></td>
      <td><Link className="btn-delete" onClick={(e) => deleteHandle(item._id)} >Delete</Link></td>
      
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
            <th>Title</th>
            <th>Article</th>
            <th>Status</th>
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