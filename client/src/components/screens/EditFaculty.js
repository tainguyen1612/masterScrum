import { useState , useEffect } from "react";
import axios from "axios";
import "./RegisterScreen.css";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import alert from '../constant/alert';

const EditFaculty = (props) => {
  const [facultydata, setFacultydata] = useState({
    facultyName: "",
    coordinator: "",
    startDay: "",
    endDay: "",
  })
  const [coordinator, setCoordinator] = useState([])
  const [error, setError] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  const currentUserId = props.match.params._id;
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const coor = await axios.get("/coordinator");
        console.log(coor.data.data);
        setCoordinator(coor.data.data);

        console.log(currentUserId);
        const single = await axios.get("/homeAdmin/lstFaculty/"+currentUserId,config);
        setFacultydata(single.data)
        // console.log(coor.data.result);
        //console.log(privateData);
        
      } catch (error) {
        //localStorage.removeItem("authToken");
        setError("loi coor");
        
      }
    };

    fetchPrivateDate();
  }, []);

const display = coordinator.map(item => 
    <option key={item._id} value={item._id}> {item.name} </option>
)

async function submit(e) {
    e.preventDefault();
    try {
        const { data } = await axios.put("/homeAdmin/lstFaculty/"+currentUserId,{...facultydata},config);
      //localStorage.setItem("authToken", data.token);
        if(data) {
          window.location = "/";
          alert("Success Update", "success");
        }else{
          alert("Fail Update", "error");
        }
      console.log(data);
    } catch (error) {
      console.log("khong nhap duoc");
      setError("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    
};

  function handle(e){
    const newData = {...facultydata}
    newData[e.target.id]=e.target.value
    setFacultydata(newData)
  }


  console.log(moment(facultydata.startDay).format("DD-MM-YYYY"));
  return (
    <div className="data">
      <div className="register-screen">
        <h1 className="title">Update Faculty</h1>
      <form onSubmit={(e)=>submit(e)} className="register-screen__form">
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Faculty Name:</label>
          <input
            type="text"
            name="facultyName"
            required
            id="facultyName"
            placeholder="Enter faculty"
            value={facultydata.facultyName}
            onChange={(e)=>handle(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Coordinator:</label>

          <select name="coordinator" id="coordinator" name="coordinator" value={facultydata.coordinator} onChange={(e)=>handle(e)}>
						<option value="">Choose a coordinator</option>  
                        {display}
			    </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Start Day:</label>
          <input
            type="date"
            name="startDay"
            required
            id="startDay"
            placeholder="startDay"
            value={moment(facultydata.startDay).format("YYYY-MM-DD")}
            onChange={(e)=>handle(e)}
          />
        </div>
        <div className="form-group">
          <label>End Day:</label>
          <input
            type="date"
            name="endDay"
            required
            id="endDay"
            placeholder="Enter end day"
            value={moment(facultydata.endDay).format("YYYY-MM-DD")}
            onChange={(e)=>handle(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Faculty
        </button>
      </form>
    </div>
    </div>
  );
};


export default EditFaculty;