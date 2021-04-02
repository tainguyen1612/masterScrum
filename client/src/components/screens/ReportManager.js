import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react';
import { Link } from "react-router-dom";
import ViewSubmit from "./ViewListSubmit";
import { saveAs } from 'file-saver';
// import { saveAs } from 'file-saver';
import JSZip from 'jszip';
const StudentScreen = () => {
  const [error, setError] = useState("");
  const [report, setReport] = useState([]);
  const [success, setSuccess] = useState(true);
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const { data } = await axios.get("/homeManager/lstFaculty/report/public", config);
        console.log(data);
        setReport(data);
        //console.log(privateData);

      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
  
  const downloadzip = (title,url) => {

    var zip = new JSZip();

    zip.file(`${title}.pdf`, url);

    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, "article.zip");
    });
  }
  //   console.log(report);
  const display = report.map((item, index) =>
  <tr key={index}>
  <td data-label="Faculty Name">{item.facultyID.facultyName}</td>
  <td data-label="Student">{item.student.name}</td>
  <td data-label="Title">{item.title}</td>
  <td data-label="Point">{item.point}</td>
  <td data-label="Feedback">{item.feedback}</td>
  <td><a className="btn-add" onClick={e => window.open(item.reportUrl, "_blank")}>View Article</a></td>
  <td><a className="btn-add" onClick={e => downloadzip(item.title, item.reportUrl)}>Download Article</a></td>
</tr>
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
      <div className="data">
        <h1 className="title">Article</h1>
        <table className="content-table">
          <thead>
            <tr>
              <th>Faculty </th>
              <th>Student</th>
              <th>Title</th>
              <th>Point</th>
              <th>Feedback</th>
              <th colSpan="2" style={{textAlign:"center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {display}
          </tbody>
        </table>
      </div>
    );
};

export default StudentScreen;
