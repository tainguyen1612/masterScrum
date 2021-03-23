import React from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import PDFViewer from 'pdf-viewer-reactjs'
import alert from '../constant/alert';
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
        const data  = await axios.get("/homeCoor/lstFaculty/report/view/"+match.params.facultyId+"/"+match.params.reportId, config);
        if(data) {
          console.log(data);
          setReport(data.data.reportUrl);
        }
        
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try{
      const data = await axios.post("/homeCoor/lstFaculty/report/feedback/"+match.params.facultyId+"/"+match.params.reportId,{...report}, config);
      if(data) {
        alert('FeedBack Added', 'success')
      }
    } catch(err){
      setError("feedback fail");
      alert('FeedBack Failed', 'error')
    }
  } 

  function handle(e){
    const newData = {...report}
    newData[e.target.id]=e.target.value
    setReport(newData);
  }
  // const display = report.map((item,index) => 
  //   <tr key={index}>
  //     <td>{item?.reportID?.student?.name}</td>
  //     <td>{item?.reportID.reportUrl}</td>
  //     <td>{item?.reportID.CreateAt}</td>
  //     <td>{item?.reportID.reportStatus}</td>
  //     <td><Link to={`//${item._id}`} color="warning" className="btn btn-warning mr-1">View</Link></td>
  //     <td><Link to={`//${item._id}`} color="warning" className="btn btn-warning mr-1">Upload</Link></td>
      
  //   </tr>  
  // )
  return error ? (
    <span className="error-message">{error}</span>
  ) : (

    <div className="register-screen" >
      <form  className="register-screen__form" onSubmit={(e) => handleFeedback(e)}>
        <h3 className="register-screen__title">Feeback Report</h3>
        <div className="form-group">
          <label htmlFor="email">Report: </label>
          <a onClick={e => window.open(report, "_blank")}>File Report</a>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Feedback: </label>
          <textarea type="text"
            name="feedback"
            required
            id="feedback"
            placeholder="FeedBack"
            value={report.feedback}
            onChange={(e)=>handle(e)}></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
  </div>
  );
}