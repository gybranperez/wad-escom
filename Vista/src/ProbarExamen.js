import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/Button";
export default class Examen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      palabras: [],
      palabraschoosen: [],
      preguntas: [],
      examenes: [],
      examenActual: 0,
      ok: false,
      count: 0,
      preguntaActual: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.mostrarModal = this.mostrarModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsuario = this.handleUsuario.bind(this);
    this.setPalabra = this.setPalabra.bind(this);
    this.actualizarLista = this.actualizarLista.bind(this);
    this.probarPalabra = this.probarPalabra.bind(this);
    this.cambiarpregunta = this.cambiarpregunta.bind(this);
  }

  componentDidMount() {
    this.actualizarLista();
  }

  cambiarpregunta(num) {
    if (
      this.state.examenes[this.state.examenActual].preguntas.length - 1 >=
        this.state.preguntaActual + num &&
      this.state.preguntaActual + num >= 0
    ) {
      this.setState({
        preguntaActual: this.state.preguntaActual + num,
        palabraschoosen: [],
        palabras: this.ordenarRandom(
          this.state.examenes[this.state.examenActual].preguntas[
            this.state.preguntaActual + num
          ].texto.split("\n")
        ),
      });
    }
    console.log(this.state.preguntaActual);
  }

  actualizarLista() {
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

  removeFromPalabras(i) {
    var fin = this.state.palabras.splice(this.state.palabras.splice(i, 1));
    this.setState({ palabras: fin });
  }

  addPalabrasChoosen(palabra) {
    this.state.palabraschoosen.push(palabra);
    this.setState({
      palabraschoosen: this.state.palabraschoosen,
    });
  }
  ordenarRandom(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  removeFromPalabrasReturn(i) {
    var fin = this.state.palabraschoosen.splice(
      this.state.palabraschoosen.splice(i, 1)
    );

    this.setState({ palabraschoosen: fin });
  }

  addPalabrasChoosenReturn(palabra) {
    this.state.palabras.push(palabra);
    this.setState({
      palabras: this.state.palabras,
    });
  }

  handleUsuario(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleClose(event) {
    this.setState({ show: false });
  }
  //Cuando probamos examen
  mostrarModal(i) {
    this.setState({
      examenActual: i,
      count: 0,
    });
    if (this.state.examenes[i].preguntas.length > 0) {
      this.setState({
        palabras: this.ordenarRandom(
          this.state.examenes[i].preguntas[
            this.state.preguntaActual
          ].texto.split("\n")
        ),
      });
    } else {
      this.setState({
        palabras: [],
      });
    }

    this.setState({
      show: true,
    });
  }

  probarPalabra() {
    console.log(
      this.state.examenes[this.state.examenActual].preguntas[
        this.state.preguntaActual
      ].numIntentos
    );
    this.setState({
      count: this.state.count + 1,
    });
    var respuesta = this.state.palabraschoosen.join("");
    var respuestas = this.state.examenes[this.state.examenActual].preguntas[
      this.state.preguntaActual
    ].respuestas.split("\n");
    console.log(respuestas);
    for (var resp of respuestas) {
      if (
        respuesta.replace(" ", "") ===
        resp.replace(" ", "").replace(" ", "").replace(" ", "")
      ) {
        alert(
          this.state.examenes[this.state.examenActual].preguntas[
            this.state.preguntaActual
          ].fpositivo
        );
        return;
      }
    }
    if (
      this.state.count <
      this.state.examenes[this.state.examenActual].preguntas[
        this.state.preguntaActual
      ].numIntentos
    ) {
      alert("Sigue intentando");
    } else {
      alert(
        this.state.examenes[this.state.examenActual].preguntas[
          this.state.preguntaActual
        ].fnegativo
      );
      this.setState({
        show: false,
      });
    }
  }

  setPalabra(i, word) {
    this.removeFromPalabras(i);
    this.addPalabrasChoosen(word);
  }
  setPalabraReturn(i, word) {
    this.removeFromPalabrasReturn(i);
    this.addPalabrasChoosenReturn(word);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <section>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {this.state.examenes.map((word, i) => (
                <tr key={i}>
                  <td>{word.nombre}</td>
                  <td>
                    <Button onClick={() => this.mostrarModal(i)}>Probar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Probar examen: {this.state.examen} | pregunta:
              {this.state.preguntaActual + 1}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Elige las palabras en el orden correcto</Modal.Body>
          <div className="container">
            Sentencia generada
            <section>
              {this.state.palabraschoosen.map((word, i) => (
                <Button
                  variant="info"
                  key={i}
                  onClick={() => this.setPalabraReturn(i, word)}
                >
                  {word}
                </Button>
              ))}
            </section>
          </div>
          <div className="container">
            Palabras posibles
            <section>
              {this.state.palabras.map((word, i) => (
                <Button
                  variant="info"
                  key={i}
                  onClick={() => this.setPalabra(i, word)}
                >
                  {word}
                </Button>
              ))}
            </section>
          </div>

          <Modal.Footer>
            <Button variant="primary" onClick={this.probarPalabra}>
              Probar
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.cambiarpregunta(-1)}
            >
              Anterior pregunta
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.cambiarpregunta(+1)}
            >
              Siguiente pregunta
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
