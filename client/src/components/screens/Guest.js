import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react';
import { Link } from "react-router-dom";
import ViewSubmit from "./ViewListSubmit";

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
        const { data } = await axios.get("/homeGuest/lstFaculty/report/public", config);
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

//   console.log(report);
  const display = report.map((item, index) =>
    <tr key={index}>
      <td data-label="Faculty Name">{item.facultyID.facultyName}</td>
      <td data-label="Student">{item.student.name}</td>
      <td data-label="Point">{item.point}</td>
      <td data-label="Feedback">{item.feedback}</td>
      <td><a onClick={e => window.open(item.reportUrl, "_blank")}>Click to see report</a></td>
    </tr>
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="data">
      <h1 className="title">Artivle</h1>
      <table className="content-table">
        <thead>
          <tr>
            <th>Faculty </th>
            <th>Student</th>
            <th>Point</th>
            <th>Feedback</th>
            <th>View Report</th>
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
