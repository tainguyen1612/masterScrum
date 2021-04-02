import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { Bar ,Pie} from "react-chartjs-2";
import { useState , useEffect } from "react";
import axios from "axios";

import "../screens/chart.css"

const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  // },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth} px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Management(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [student, setStudent] = useState([]);
  const [report, setReport] = useState([]);
  const [name, setName] = useState([]);
  const [publicReport, setPublic] = useState([]);
  const [avg, setAvg] = useState([]);
  const [oneSubmit, setSubmit] = useState([]);
  useEffect(() => {
    const fetchPrivateDate = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            token : localStorage.getItem("authToken")
          },
        };
        const { data } = await axios.get("/homeManager/lstFaculty/chart", config);
        if(data) {
          const studentCount = data.map(x => x.studentCount);
          const reportCount = data.map(y => y.reportCount);
          const facultyName = data.map(z => z.facultyName);
          const reportSelect = data.map(m=>m.publicReport);
          const avgPoint = data.map(p=>p.pointAvarge);
          const oneSubmits = data.map(o=>o.submitCount)
          setStudent(studentCount);
          setReport(reportCount);
          setName(facultyName);
          setPublic(reportSelect);
          setAvg(avgPoint);
          setSubmit(oneSubmits);
        }
      } catch (error) {
        setError("You are not authorized please login");
      }
    };
    fetchPrivateDate();
  }, []);

  return (
    <div className="data">
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

      </AppBar>
      <h1 className="title">Dashboard</h1>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Number of students per faculty</Typography>

        <Bar
          data={{
            labels: name,
            datasets: [
              {
                label: "Student",
                data: student,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              }
            ],
          }}
          height={150}
          width={150}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                      beginAtZero: true,
                      steps: 10,
                      stepValue: 5,
                      max: 10
                  }
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </main>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Number of contributions per faculty</Typography>

        <Bar
          data={{
            labels: name,
            datasets: [
              {
                label: "Report",
                data: report,
                backgroundColor: "orange",
                borderColor: "red",
              },
            ],
          }}
          height={150}
          width={150}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                      beginAtZero: true,
                      steps: 10,
                      stepValue: 5,
                      max: 10
                  }
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </main>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Number of articles is selected by faculty</Typography>
        <Pie
        data={{
          labels: name,
          datasets: [
            {
              label: 'Public Article',
              data: publicReport,
              backgroundColor: [  
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
      </main>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Average score of the faculties</Typography>

        <Bar
          data={{
            labels: name,
            datasets: [
              {
                label: "Avegare",
                data: avg,
                backgroundColor: "blue",
                borderColor: "blue",
              },
            ],
          }}
          height={150}
          width={150}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                      beginAtZero: true,
                      steps: 10,
                      stepValue: 5,
                      max: 10
                  }
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </main>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Number of articles only submit one time</Typography>

        <Pie
        data={{
          labels: name,
          datasets: [
            {
              label: 'Submit',
              data: oneSubmit,
              backgroundColor: [  
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          option: {
            tooltips: {
              enabled: true
            },
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
          
                  let sum = ctx.dataset._meta[0].total;
                  let percentage = (value * 100 / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: '#fff',
              }
            }
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
      </main>


    </div>
    </div>
  );
}

Management.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Management;