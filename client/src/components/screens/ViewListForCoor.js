import React from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import alert from '../constant/alert'
export default function ViewRerportForCor({match}) {
  const [error, setError] = useState("");
  const [report, setReport] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };

  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const data  = await axios.get("/homeCoor/lstFaculty/report/list/"+match.params.facultyId, config);
        setReport(data.data);
        //console.log(privateData);
        
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const post = async (id) => {
    try {
      const postdata = await axios.post(`/homeCoor/lstFaculty/report/public/${match.params.facultyId}/${id}`, {
        "public": true  
    }
    , config);
    if(postdata && postdata.data && postdata.data.success){
          alert(postdata.data.message, "success");
    }
      } catch (error) {
        setError("Public Fail");
      }
  }
  const display = report.map((item,index) =>
  <tr key={index}>
      <td data-label="Student Name">{item?.reportID?.student?.name}</td>
      <td data-label="Title">{item.reportID.title}</td>
      <td data-label="Day Submit">{item?.reportID.CreateAt}</td>
      <td data-label="Status">{item?.reportID.reportStatus}</td>
      <td><Link to={`/faculty/report/${match.params.facultyId}/${item.reportID._id}`} color="warning" className="btn-add btn-warning mr-1">View</Link></td>
      <td><Link onClick={e => post(item.reportID._id)} color="warning" className="btn-delete btn-warning mr-1">Upload</Link></td>
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
            <th>Name Student</th>
            <th>Title Article</th>
            <th>Day Submit</th>
            <th>Status</th>
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