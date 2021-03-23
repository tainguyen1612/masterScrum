import { useState, useEffect, Component } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import React from 'react';
import { Link } from "react-router-dom";
import ViewSubmit from "./ViewListSubmit";

const StudentScreen = () => {

  const [error, setError] = useState("");
  const [faculty, setFaculty] = useState([]);
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
        const { data } = await axios.get("/homeStudent/lstFaculty", config);
        setFaculty(data.data);
        //console.log(privateData);

      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const joinFaculty = async (id) => {
    try {
      const join = await axios.post(`/homeStudent/lstFaculty/${id}`, null, config);
      setSuccess(join.data.success);
      console.log(join.data);
      console.log(id);

    } catch (error) {
      setError("Fail Join");
    }
  }

  const display = faculty.map((item, index) =>
    <tr key={index}>
      <td>{item.facultyName}</td>
      <td>{item.coordinator.name}</td>
      <td>{item.startDay}</td>
      <td>{item.endDay}</td>
      {!item.isJoin && <td><Link to={"/"} color="warning" onClick={() => joinFaculty(item._id)} className="btn btn-warning mr-1">Join</Link></td>}
      {item.isJoin ? <td><Link to={"/view_report/"+item._id} color="warning" className="btn btn-warning mr-1">View</Link></td> : null}
      {item.isJoin ? <td><Link to={`/submit/${item._id}/${item.endDay}`} color="warning" className="btn btn-warning mr-1">Submit</Link></td> : null}
    </tr>
  )

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
      <table className="content-table">
        <thead>
          <tr>
            <th>Faculty Title</th>
            <th>Coordinator Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th colSpan="3">Action</th>
          </tr>
        </thead>
        <tbody>
          {display}
        </tbody>
      </table>
    );
};

export default StudentScreen;
