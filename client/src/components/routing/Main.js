import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Admin from "../screens/PrivateScreen";
import UserForAdmin from "../screens/LstUser";
import CreateUser from "../screens/AddAccountScreen";
import CreateFaculty from "../screens/AddFaculty"
import EditFaculty from "../screens/EditFaculty"
import EditUser from "../screens/EditUser"

import CoorScreen from "../screens/CoorScreen"
import CoorProfile from "../screens/CoorProfile"
import UserForEachFaculty from "../screens/UserForEachFaculty"
import SubmitForEachFaculty from "../screens/ViewListForCoor"
import ViewReportForCor from "../screens/ViewReportForCor"

import Student from "../screens/Student";
import ViewReportForEachFaculty from "../screens/ViewListSubmit"
import ManagerScreen from "../screens/Manager"
import Submit from "../screens/SubmitReport"
import StuProfile from "../screens/ProfileStudent"

import ListArticle from "../screens/ReportManager"

import GuestScreen from "../screens/Guest"

import PrivateScreen from "../screens/PrivateScreen";
import NotFound from "../screens/404Page"


export default function Main() {
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchPrivateDate = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("authToken"),
            },
          };
    
          try {
            const {data}  = await axios.get("/checkRole", config);
            setRole(data.data);
            console.log(data.data);
            //console.log(privateData);
            
          } catch (error) {
            
            
          }
        };
    
        fetchPrivateDate();
      }, []);

    return (
        <div>

            <Switch>
                {/* admin */}
                
                <Route path="/" exact component={(role==="admin") ? Admin : (role==="student") ? Student : (role==="coordinator") ? CoorScreen : (role==="manager") ? ManagerScreen : (role==="guest") ? GuestScreen : NotFound} />
                <Route path="/add_faculty" exact component={(role==="admin") ? CreateFaculty : NotFound} />
                <Route path="/edit_faculty/:_id" exact component={(role==="admin") ? EditFaculty : NotFound} /> 
                
                <Route path="/list_user" exact component={(role==="admin") ? UserForAdmin : NotFound} />
                <Route path="/add_user" exact component={(role==="admin") ? CreateUser : NotFound} />
                <Route path="/edit_user/:userID" exact component={(role==="admin") ? EditUser : NotFound} />

                {/* Coordinator */}
                <Route path="/user_for_faculty/:facultyId" exact component={(role==="coordinator") ? UserForEachFaculty : NotFound} />
                <Route path="/submit_for_faculty/:facultyId" exact component={(role==="coordinator") ? SubmitForEachFaculty : NotFound} />
                <Route path="/coo_profile" exact component={(role==="coordinator") ? CoorProfile : NotFound} />
                <Route path="/faculty/report/:facultyId/:reportId" exact component={(role==="coordinator") ? ViewReportForCor : NotFound} />


                 {/* Student */} 
                 
                 <Route path="/view_report/:facultyID" exact component={(role==="student") ? ViewReportForEachFaculty : NotFound} />
                 <Route path="/submit/:facultyID/:endtime" exact component={(role==="student") ? Submit : NotFound} />
                 {/* <Route path="/resubmit/:reportID" exact component={(role==="student") ? Resubmit : NotFound} /> */}
                 <Route path="/stu_profile" exact component={(role==="student") ? StuProfile : NotFound} />

                 {/* manager */}
                 <Route path="/article" exact component={(role==="manager") ? ListArticle : NotFound} />

                {/* guest */}
                {/* <Route path="/" exact component={(role==="guest") ? FacultyForGuest : NotFound} />
                <Route path="/list_article/:facultyID" exact component={(role==="manager") ? ListArticleForEachFaculty : NotFound} />
                <Route path="/articlt/:reportID" exact component={(role==="guest") ? ViewReport : NotFound} /> */}

            </Switch>
        </div>
    );
}
