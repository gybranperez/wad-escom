import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Preguntas from "./Preguntas";
import Examen from "./Examen";
import Button from "react-bootstrap/Button";
import ProbarExamen from "./ProbarExamen";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginTrue: true };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(state) {
    this.setState({
      loginTrue: !state,
    });
  }
  refreshPage() {
    window.location.reload(false);
  }
  salir() {
    var data = new URLSearchParams();
    data.append("opcion", "login.salir");
    fetch("/ETS_2/Controlador", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => {
        this.refreshPage();
      })
  }
  componentDidMount() {
    var data = new URLSearchParams();
    data.append("opcion", "login.is");
    fetch("/ETS_2/Controlador", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        if (myJson) {
          this.setState({
            loginTrue: false,
          });
        }
      });
  }
  render() {
    if (this.state.loginTrue) {
      return <Login onLogin={this.handleLogin}></Login>;
    } else {
      return (
        <Router>
          <div>
            <nav className="nav">
              <ul>
                <li>
                  <Link to="/">Preguntas</Link>
                </li>
                <li>
                  <Link to="/about">Examen</Link>
                </li>
                <li>
                  <Link to="/users">Probar examen</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            <Button variant="danger" onClick={()=>this.salir()}>
              salir
            </Button>
          </div>
        </Router>
        
      );
    }
    function Home() {
      return <Preguntas></Preguntas>;
    }

    function About() {
      return <Examen></Examen>;
    }

    function Users() {
      return <ProbarExamen></ProbarExamen>;
    }
  }
}
