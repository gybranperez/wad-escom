import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class Vinculos extends React.Component {
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
    /*
    fetch("/ETS_2/Login", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: this.usuario,
        password: this.password,
      }),
    }).then((response) => {
      console.log(response);
    });
    */
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <section>
          <a>Crear preguntas</a>
          <a>Crear examen</a>
          <a>Probar examen</a>
        </section>
      </div>
    );
  }
}

export default Vinculos;
