import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/Button";
export default class Examen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show2: false,
      nombre: "",
      intentos: 0,
      preguntaActual: 0,
      examenes: [],
      preguntas: [],
      change: true,
      preguntasEnExamen: [],
    };
    this.handleClose = this.handleClose.bind(this);
    this.mostrarModal = this.mostrarModal.bind(this);
    this.mostrarModal2 = this.mostrarModal2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsuario = this.handleUsuario.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.verExamen = this.verExamen.bind(this);
    this.actualizarLista = this.actualizarLista.bind(this);
    this.actualizarExamenes = this.actualizarExamenes.bind(this);
    this.altaExamen = this.altaExamen.bind(this);
    this.agregarALista = this.agregarALista.bind(this);
    this.eliminarDeListaPreguntas = this.eliminarDeListaPreguntas.bind(this);
    this.altaPreguntasExamen = this.altaPreguntasExamen.bind(this);
    this.bajaExamen = this.bajaExamen.bind(this);
    this.copiarExamen = this.copiarExamen.bind(this);
  }

  agregarALista() {
    console.log(this.state.preguntaActual);
    var isin = 0;
    var idp = this.state.preguntas[this.state.preguntaActual].ID;
    for (var pregunta of this.state.preguntasEnExamen) {
      if (pregunta.ID === idp) {
        isin = 1;
        break;
      }
    }
    if (!isin) {
      this.state.preguntasEnExamen.push(
        this.state.preguntas[this.state.preguntaActual]
      );
      var lista = this.state.preguntasEnExamen;
      this.setState({
        preguntasEnExamen: lista,
      });
    }
  }
  eliminarDeListaPreguntas(i) {
    this.state.preguntasEnExamen.splice(i, 1);
    var lis = this.state.preguntasEnExamen;
    this.setState({
      preguntasEnExamen: lis,
    });
  }

  componentDidMount() {
    this.actualizarExamenes();
  }

  bajaExamen(i) {
    var data = new URLSearchParams();
    data.append("opcion", "examen.baja");
    data.append("idExamen", this.state.examenes[i].ID);
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
        this.actualizarExamenes();
      });
  }

  actualizarExamenes() {
    var data = new URLSearchParams();
    data.append("opcion", "examen.lista");
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
        this.setState({
          examenes: myJson,
        });
      });
  }

  modificarExamen(idExam, nombre) {
    var data = new URLSearchParams();
    data.append("opcion", "examen.modificar");
    data.append("idExamen", idExam);
    data.append("nombre", nombre);
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
        this.setState({});
      });
  }

  altaPreguntasExamen() {
    this.modificarExamen(this.state.examenActual, this.state.nombre);
    for (var pregunta of this.state.preguntasEnExamen) {
      var data = new URLSearchParams();
      data.append("opcion", "examen.pregunta.add");
      data.append("idExamen", this.state.examenActual);
      data.append("idPregunta", pregunta.ID);
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
          this.setState({});
        });
    }
    this.setState(
      {
        show2: false,
      },
      this.actualizarExamenes
    );
  }

  actualizarLista() {
    var data = new URLSearchParams();
    data.append("opcion", "pregunta.lista");
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
        console.log(myJson);
        this.setState({
          preguntas: myJson,
        });
      });
  }

  altaExamen() {
    var data = new URLSearchParams();
    if (this.state.mod) {
      data.append("opcion", "pregunta.modificar");
      data.append("id", this.state.examenes[this.state.actualId].ID);
      this.setState({
        mod: false,
      });
    } else {
      data.append("opcion", "examen.nuevo");
    }
    data.append("nombre", this.state.nombre);
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
        this.setState({
          show: false,
        });
        this.actualizarExamenes();
      });
  }

  copiarExamen(i) {
    var data = new URLSearchParams();
    data.append("opcion", "examen.nuevo");
    data.append("nombre", this.state.examenes[i].nombre + " copia");
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
        this.setState({
          show: false,
        });
        this.actualizarExamenes();
      });
  }

  handleUsuario(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleClose(event) {
    this.setState({ show: false });
  }

  handleClose2(event) {
    this.setState({ show2: false });
  }

  mostrarModal(event) {
    this.setState({
      show: true,
    });
  }

  verExamen(i) {
    this.setState({
      show: true,
      change: false,
      nombre: this.state.examenes[i].nombre,
    });
  }

  mostrarModal2(i) {
    this.actualizarLista();
    this.setState({
      nombre: this.state.examenes[i].nombre,
      show2: true,
      examenActual: this.state.examenes[i].ID,
      preguntasEnExamen: this.state.examenes[i].preguntas,
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <section>
          <Button onClick={this.mostrarModal}>Agregar examen</Button>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.examenes.map((word, i) => (
                <tr key={i}>
                  <td>{word.nombre}</td>
                  <td>
                    <Button onClick={() => this.mostrarModal2(i)}>
                      Modificar
                    </Button>
                    |
                    <Button onClick={() => this.bajaExamen(i)}>Eliminar</Button>
                    |
                    <Button onClick={() => this.copiarExamen(i)}>Copiar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
        <Modal show={this.state.show2} onHide={this.handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar examen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Agrega la informacion del examen
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre del examen</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm">
                <Form.Label>Elige una pregunta a agregar al examen</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleUsuario}
                  name="preguntaActual"
                >
                  {this.state.preguntas.map((word, i) => (
                    <option value={i} key={i}>
                      {word.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.preguntasEnExamen.map((word, i) => (
                    <tr key={i}>
                      <td>{word.nombre}</td>
                      <td>
                        <Button
                          onClick={() => this.eliminarDeListaPreguntas(i)}
                        >
                          Eliminar del examen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                onClick={this.agregarALista}
                className="left-align"
                variant="primary"
              >
                Agregar pregunta
              </Button>
              <Button
                onClick={this.altaPreguntasExamen}
                className="right-align"
                variant="primary"
                type="submit"
              >
                Guardar examen
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose2}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar examen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Agrega la informacion del examen
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre del examen</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Button
                onClick={this.altaExamen}
                className="right-align"
                variant="primary"
                type="submit"
              >
                Guardar examen
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
