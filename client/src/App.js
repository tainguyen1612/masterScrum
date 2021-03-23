import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import LoginScreen from "./components/screens/LoginScreen";
import Main from "./components/routing/Main"
import Header from "./components/routing/Header"


const App = () => {
  return (
    <Router>
      <div className="app">
          <Route exact path="/login" component={LoginScreen} />   
          <PrivateRoute component={Header} />
          <PrivateRoute component={Main} />
      </div>
    </Router>

  );
};

export default App;
