import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/login/Login";
import Monitor from "./components/monitor/Monitor";
import MonitorSecciones from "./components/monitor/MonitorSecciones";
import Panel from "./components/administracion/Panel";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/monitor">
            <Monitor></Monitor>
          </Route>
          <Route path="/secciones/:nLocal">
            <MonitorSecciones></MonitorSecciones>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/panel">
            <Panel></Panel>
          </Route>
          {/* Ruta por defecto */}
          <Route path="/">
            <Landing></Landing>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
