import { useState , useEffect } from "react";
import axios from "axios";
import "./RegisterScreen.css";
import alert from "../constant/alert"

const AddFaculty = () => {
  const [facultydata, setFacultydata] = useState({
    facultyName: "",
    coordinator: "",
    startDay: "",
    endDay: "",
  })
  const [coordinator, setCoordinator] = useState([])
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {

      try {
        const coor = await axios.get("/coordinator");
        console.log(coor.data.data);
        setCoordinator(coor.data.data);
        
        
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

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken"),
      },
    };

    try {
        const { data } = await axios.post("/homeAdmin/addFaculty",{...facultydata},config);
      //localStorage.setItem("authToken", data.token);
        if(data){
          window.location = "/";
          alert("Create Faculty Success", "success");
        } else{
          alert(data.message, "error");
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



  return (
    <div className="data">
      <h1 className="title">Create Faculty</h1>
      <div className="register-screen">
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
              value={facultydata.startDay}
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
              value={facultydata.endDay}
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


export default AddFaculty;