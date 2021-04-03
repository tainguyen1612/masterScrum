import { useState , useEffect } from "react";
import axios from "axios";
import "./RegisterScreen.css";
// import { handleUpload } from'../constant/uploadWord';
import { storage } from "../config/firebase";
import alert from '../constant/alert';
import moment from 'moment';
const SubmitReport = ({match}) => {
  const [pdf, setPdf] = useState(null);
  const [time, setTime] = useState();
  const [title, setTitle] = useState({
    title: "",
  });
  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(true);

  const handleChange = e => {
    if (e.target.files[0]) {
      setPdf(e.target.files[0]);
    }
  };
  function handle(e){
    const newData = {...title}
    newData[e.target.id]=e.target.value
    setTitle(newData)
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      token : localStorage.getItem("authToken")
    },
  };
  const handleUpload = (pdf, title) => {
    const uploadTask = storage.ref(`pdfs/${pdf.name}`).put(pdf);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert("can not upload pdf", "error");
        console.log(error);
      },
      () => {
         storage
          .ref("pdfs")
          .child(pdf.name)
          .getDownloadURL()
          .then(async (url) => {
            const {data} = await axios.post(
              `/homeStudent/lstFaculty/report/upload/${match.params.facultyID}`,
              { title: title, reportUrl:  url},
              config
            );
            if(data.success === true) {
              window.location = "/";
            alert(data.message, "success");
            }
          });
      }
    );
  };

  useEffect(()=> {
    const  end = moment(match.params.endtime);
    const cur = moment();
    let checkTime = end.diff(cur, 'days');
    console.log(typeof checkTime);
    if(checkTime < 0) {
      checkTime = 0
      
    }
    setTime(checkTime)
  },[])



  return time > 0 ? (
    // <div>
    //   <input type="file" onChange={handleChange} />
    //   <p>{time}</p>
    //   <button onClick={e => handleUpload(pdf)}>Upload</button>
    // </div>
    <div className="data">
      <h1 className="title">Faculty / Submit Report</h1>
      <div className="register-screen">
        <div className="register-screen__form">
          <div className="form-group">
            <label htmlFor="email">Time to upload</label>
            <p style={{color: "red"}}>You have {time} day to submit report</p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Title:</label>
            <input
              type="text"
              name="title"
              required
              id="title"
              value={title.title}
              onChange={(e)=>handle(e)}
            />
          </div>     
          <div className="form-group">
            <label htmlFor="name">File:</label>
            <input
              type="file"
              name="fileName"
              required
              id="fileName"
              onChange={handleChange}
            />
          </div>
          {/* <input type="radio" value="law" name="law" onClick={() => showButton()}/> */}
          {/* <button onClick={e => handleUpload(pdf)} className="btn btn-primary" style={{display: "none"}}>Submit</button> */}
          <input type="radio" value="law" name="law" onClick={onClick} /> Accept all law of university
          { showResults ? <button onClick={e => handleUpload(pdf, title.title)} className="btn btn-primary" > Submit</button> : null }
        </div>
      </div>
    </div>
  ) : (
  <div className="data">
    <h1 className="title">You can't submit because the time for submitting the article has ended</h1>
  </div>
  )
};


export default SubmitReport;