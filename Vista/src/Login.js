import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usuario: "", password: "" };
    this.handleUsuario = this.handleUsuario.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsuario(event) {
    this.setState({
      usuario: event.target.value,
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    var data = new URLSearchParams();
    data.append("usuario", this.state.usuario);
    data.append("password", this.state.password);
    data.append("opcion", "login.usuario");
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
          this.props.onLogin(true);
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <section>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="usuario"
                type="text"
                placeholder="Usuario"
                onChange={this.handleUsuario}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handlePassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </section>
      </div>
    );
  }
}
