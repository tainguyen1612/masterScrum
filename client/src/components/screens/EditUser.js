import { useState , useEffect } from "react";
import axios from "axios";
import "./RegisterScreen.css";
import alert from '../constant/alert';
const EditUser = (props) => {
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  })

  const [error, setError] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("authToken"),
    },
  };
  const currentUserId = props.match.params.userID;
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {

        console.log(currentUserId);
        const single = await axios.get("/homeAdmin/lstUser/"+currentUserId,config);
        setUserdata(single.data);
        // console.log(coor.data.result);
        //console.log(privateData);
        
      } catch (error) {
        //localStorage.removeItem("authToken");
        setError("loi coor");
        
      }
    };

    fetchPrivateDate();
  }, []);


async function submit(e) {
    e.preventDefault();
    try {
        const { data } = await axios.patch("/homeAdmin/lstUser/"+currentUserId,{...userData},config);
      //localStorage.setItem("authToken", data.token);
      if(data) {
        alert('successfully', 'success');
    }else{
        alert('Fail update', 'Error');
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
    const newData = {...userData}
    newData[e.target.id]=e.target.value
    setUserdata(newData)
  }


//   console.log(moment(facultydata.startDay).format("DD-MM-YYYY"));
  return (
    <div className="data">
        <h1 className="title">Update User</h1>
        <div className="register-screen">
            <form onSubmit={(e)=>submit(e)} className="register-screen__form">
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        id="name"
                        placeholder="Enter name"
                        value={userData.name}
                        onChange={(e)=>handle(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            required
                            id="email"
                            placeholder="Enter email"
                            value={userData.email}
                            onChange={(e)=>handle(e)}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Phone:</label>
                    <input
                        type="phone"
                        name="phone"
                        required
                        id="phone"
                        placeholder="Enter Phone"
                        value={userData.phone}
                        onChange={(e)=>handle(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        id="password"
                        placeholder="Enter password"
                        value={userData.password}
                        onChange={(e)=>handle(e)}
                    />
                </div>

                <div className="form-group">
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        required
                        id="role"
                        placeholder="Enter role"
                        value={userData.role}
                        onChange={(e)=>handle(e)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                Update
                </button>
            </form>
        </div>
    </div>
  );
};


export default EditUser;