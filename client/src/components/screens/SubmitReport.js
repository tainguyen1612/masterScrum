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

  const handleChange = e => {
    if (e.target.files[0]) {
      setPdf(e.target.files[0]);
    }
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      token : localStorage.getItem("authToken")
    },
  };
  const handleUpload = (pdf) => {
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
              { reportUrl:  url},
              config
            );
            if(data.success === true) {
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
//   const [reportdata, setReportData] = useState({
//     File: "",
//     coordinator: "",
//     startDay: "",
//     endDay: "",
//   })
//   const [coordinator, setCoordinator] = useState([])
//   const [error, setError] = useState("");

// const display = coordinator.map(item => 
//     <option key={item._id} value={item._id}> {item.name} </option>
// )

// async function submit(e) {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         token: localStorage.getItem("authToken"),
//       },
//     };

//     try {
//         // const { data } = await axios.post("/homeAdmin/addFaculty",config,{...facultydata});
//       //localStorage.setItem("authToken", data.token);
    
//       // console.log(data);
//     } catch (error) {
//       console.log("khong nhap duoc");
//       setError("");
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
    
// };

  // function handle(e){
  //   const newData = {...facultydata}
  //   newData[e.target.id]=e.target.value
  //   setFacultydata(newData)
  // }



  return (
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
            <label htmlFor="name">File:</label>
            <input
              type="file"
              name="fileName"
              required
              id="fileName"
              onChange={handleChange}
            />
          </div>
          
          <button onClick={e => handleUpload(pdf)} className="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  );
};


export default SubmitReport;