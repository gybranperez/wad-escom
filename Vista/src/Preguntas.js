import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/Button";
export default class Preguntas extends React.Component {
  componentDidMount() {
    this.actualizarLista(); //Actualizamos toda la lista de preguntas del usuario
  }

  altaPregunta() { //Funcion que llamamos al momento de crear o modificar una nueva pregunta
    var data = new URLSearchParams();
    if (this.state.mod) { //Bandera para ver si se modifica o solo se crea
      data.append("opcion", "pregunta.modificar"); //opcion que se envia al controlador para ver que se tiene que hacer
      data.append("id", this.state.preguntas[this.state.actualId].ID); // ID de la pregunta que sera modificada
      this.setState({
        mod: false, //Devolvemos el estado de modificar a false
      });
    } else { // sino , significa que se trata de la creacion de una NUEVA pregunta
      data.append("opcion", "pregunta.nueva"); //bandera donde direccionamos a esa funcion
    }
    data.append("nombre", this.state.nombre);//Obtenemos el nombre
    data.append("texto", this.state.texto);
    data.append("numIntentos", this.state.intentos);
    data.append("tipoPregunta", 1);
    data.append("fpositivo", this.state.fpositivo);
    data.append("fnegativo", this.state.fnegativo);
    data.append("respuestas", this.state.resps);
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
        this.actualizarLista();
      });
  }

  bajaPregunta(i) {
    var data = new URLSearchParams();
    data.append("opcion", "pregunta.eliminar");
    data.append("idPregunta", this.state.preguntas[i].ID);
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
        this.actualizarLista();
      });
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
        this.setState({
          preguntas: myJson,
        });
      });
  }
  /*
Funcion para modificar los valores de una pregunta
*/
  modificarpregunta(i) {//Pasando el index para obtenerlo del arreglo preguntas
    this.setState({
      nombre: this.state.preguntas[i].nombre,
      intentos: this.state.preguntas[i].numIntentos,
      texto: this.state.preguntas[i].texto,
      fpositivo: this.state.preguntas[i].fpositivo,
      fnegativo: this.state.preguntas[i].fnegativo,
      resps: this.state.preguntas[i].respuestas,
      show: true,
      mod: true,  // MOD = TRUE
      actualId: i,
    });
  }
/*
Funcion para generar una pregunta a partir de otra
*/
  copiarPregunta(i) {//El parametro que recibe es el index de la pregunta que se va a copiar
    this.setState(
      {
        //Se copia todo igual excepto el nombre al cual se le añade una cadena (copia)
        nombre: this.state.preguntas[i].nombre + " copia",
        intentos: this.state.preguntas[i].numIntentos,
        texto: this.state.preguntas[i].texto,
        fpositivo: this.state.preguntas[i].fpositivo,
        fnegativo: this.state.preguntas[i].fnegativo,
        resps: this.state.preguntas[i].respuestas,
      },
      this.altaPregunta
    );
  }

  verPregunta(i) {
    this.setState({
      add: false,
      nombre: this.state.preguntas[i].nombre,
      intentos: this.state.preguntas[i].numIntentos,
      texto: this.state.preguntas[i].texto,
      fpositivo: this.state.preguntas[i].fpositivo,
      fnegativo: this.state.preguntas[i].fnegativo,
      resps: this.state.preguntas[i].respuestas,
      show: true,
    });
  }
/*
          CONSTRUCTOR DE PREGUNTA con sus flags 
*/
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nombre: "",
      intentos: 0,
      texto: "",
      fpositivo: "",
      fnegativo: "",
      actualId: 0,
      resps: "",
      mod: false,
      preguntas: [],
      add: true,
    };
    /*
      Al usar Function.prototype.bind dentro de la 
      renderización se crea una nueva función cada vez 
      que el componente se renderiza
    */
    this.handleClose = this.handleClose.bind(this);
    this.mostrarModal = this.mostrarModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsuario = this.handleUsuario.bind(this);
    this.bajaPregunta = this.bajaPregunta.bind(this);
    this.altaPregunta = this.altaPregunta.bind(this);
    this.verPregunta = this.verPregunta.bind(this);
    this.modificarpregunta = this.modificarpregunta.bind(this);
    this.copiarPregunta = this.copiarPregunta.bind(this);
  }

  handleUsuario(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleClose(event) {
    if (this.state.mod) {
      this.setState({
        mod: false,
      });
    }
    this.setState({ show: false, add: true });
  }

  mostrarModal(event) {
    this.setState({
      show: true,
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
          <Button onClick={this.mostrarModal}>Agregar pregunta</Button>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.preguntas.map((word, i) => (
                <tr key={i}>
                  <td>{word.nombre}</td>
                  <td>
                    <Button
                      onClick={() => {
                        this.verPregunta(i);
                      }}
                    >
                      Ver
                    </Button>
                    |
                    <Button
                      onClick={() => {
                        this.modificarpregunta(i);
                      }}
                    >
                      Modificar
                    </Button>
                    |
                    <Button
                      onClick={() => {
                        this.bajaPregunta(i);
                      }}
                    >
                      Eliminar
                    </Button>
                    |
                    <Button onClick={() => this.copiarPregunta(i)}>
                      Copiar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar pregunta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Agrega la informacion de tu pregunta
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre de la pregunta</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Sentencia por salto de linea</Form.Label>
                <Form.Control
                  as="textarea"
                  name="texto"
                  type="text"
                  placeholder="Texto"
                  value={this.state.texto}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Numero de intentos</Form.Label>
                <Form.Control
                  name="intentos"
                  type="text"
                  placeholder="2"
                  value={this.state.intentos}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Posibles respuestas por salto de linea</Form.Label>
                <Form.Control
                  as="textarea"
                  name="resps"
                  type="text"
                  placeholder="Texto"
                  value={this.state.resps}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Feedback positivo</Form.Label>
                <Form.Control
                  name="fpositivo"
                  type="text"
                  placeholder="Bien hecho"
                  value={this.state.fpositivo}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Feedback negativo</Form.Label>
                <Form.Control
                  name="fnegativo"
                  type="text"
                  placeholder="Mal hecho"
                  value={this.state.fnegativo}
                  onChange={this.handleUsuario}
                />
              </Form.Group>
              {this.state.add && (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.altaPregunta}
                >
                  Agregar
                </Button>
              )}
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
