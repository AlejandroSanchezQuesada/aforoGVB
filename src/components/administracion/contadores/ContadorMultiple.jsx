import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Constantes from "../../Constantes/constantes";

const Contenedor = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  font-family: "parking";
  text-align: center;
  background-color: #e5f1fb;
`;

const ContenedorSeccion = styled.div`
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: 100%;
  font-family: "parking";
  text-align: center;
`;

const GridBotones = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 50%));
  margin: 5%;
`;

const Button = styled.button`
  width: 90%;
  padding: 5vh;
  margin: 1vh;
  background-color: #00b74a;
  color: white;
  font-size: 7vh;
  border: solid #00b74a 1px;
  border-radius: 10px;
  &:active {
    transition: 0.3s;
    background-color: #107036;
  }
`;

const ButtonMenos = styled(Button)`
  background-color: #fde406;
  border: solid #fde406 1px;
  &:active {
    transition: 0.3s;
    background-color: #a39301;
  }
`;

const Titulo = styled.h1`
  font-size: 6vw;

  @media (max-width: 600px) {
    font-size: 50px;
  }
`;

function ContadorMultiple() {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const [idSeccionIzquierda, setIdSeccionIzquierda] = useState();
  const [nombreSeccionIzquierda, setNombreSeccionIzquierda] = useState("");
  const [aforoSeccionIzquierda, setaforoSeccionIzquierda] = useState(
    "Selecciona Local..."
  );
  const [nombreSeccionDerecha, setNombreSeccionDerecha] = useState("");
  const [aforoSeccionDerecha, setAforoSeccionDerecha] = useState(
    "Selecciona Local..."
  );

  const [idSeccionDerecha, setIdSeccionDerecha] = useState();
  const [secciones, setSecciones] = useState([]);
  /* const izquierdaSeleccionado = useRef(""); */
  const derechaSeleccionado = useRef("");

  const [izquierdaSeleccionado, setIzquierdaSeleccionado] = useState("");

  const Enlace = styled(Link)`
    text-align: left;
    display: flex;
    justify-content: left;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #0f172a;
  `;

  useEffect(() => {
    axios
      .get(Constantes.RUTA_API + "secciones")
      .then(function (response) {
        let arrayData = [];
        // handle success
        response.data.data.forEach((seccion) => {
          arrayData.push(seccion);
        });

        setSecciones(arrayData);
        console.log(secciones);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const cargarSelector = secciones.map((seccion) => (
    <option key={seccion.id} value={seccion.id}>
      {seccion.nombre}
    </option>
  ));

  const cargarSelectorDerecha = secciones.map((seccion) => (
    <option key={seccion.id} value={seccion.id}>
      {seccion.nombre}
    </option>
  ));

  function establecerValoresIzquierda(e) {
    setIdSeccionIzquierda(e.target.value);
    cargarContadorIzquierda(e.target.value);
  }

  function cargarContadorIzquierda(id) {
    let seccionEscogida = secciones.find((seccion) => seccion.id == id);
    setNombreSeccionIzquierda(seccionEscogida.nombre);
    setaforoSeccionIzquierda(seccionEscogida.aforo);
  }

  function establecerValoresDerecha(e) {
    setIdSeccionDerecha(e.target.value);
    cargarContadorDerecha(e.target.value);
  }

  function cargarContadorDerecha(id) {
    let seccionEscogida = secciones.find((seccion) => seccion.id == id);
    setNombreSeccionDerecha(seccionEscogida.nombre);
    setAforoSeccionDerecha(seccionEscogida.aforo);
  }

  function incrementarContadorIzquierda() {
    vibrar();

    axios
      .post(Constantes.RUTA_API + "incrementarContador", {
        id: idSeccionIzquierda,
      })
      .then(function (response) {
        setaforoSeccionIzquierda(response.data.aforo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function decrementarContadorIzquierda() {
    vibrar();

    axios
      .post(Constantes.RUTA_API + "decrementarContador", {
        id: idSeccionIzquierda,
      })
      .then(function (response) {
        setaforoSeccionIzquierda(response.data.aforo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function incrementarContadorDerecha() {
    vibrar();

    axios
      .post(Constantes.RUTA_API + "incrementarContador", {
        id: idSeccionDerecha,
      })
      .then(function (response) {
        setAforoSeccionDerecha(response.data.aforo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function decrementarContadorDerecha() {
    vibrar();

    axios
      .post(Constantes.RUTA_API + "decrementarContador", {
        id: idSeccionDerecha,
      })
      .then(function (response) {
        setAforoSeccionDerecha(response.data.aforo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function actualizarContador() {
    axios
      .get(Constantes.RUTA_API + "secciones")
      .then(function (response) {
        // handle success
        let data = response.data.data;

        data.forEach((dato) => {
          if (dato.id == idSeccionDerecha) {
            setAforoSeccionDerecha(dato.aforo);
          }

          if (dato.id == idSeccionIzquierda) {
            setaforoSeccionIzquierda(dato.aforo);
          }
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      actualizarContador();
    }, 5000);

    return () => clearInterval(interval);
  });

  function vibrar() {
    // enable vibration support
    navigator.vibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate;

    if (navigator.vibrate) {
      // vibration API supported
      navigator.vibrate(500);
    }
  }

  return (
    <Contenedor>
      <ContenedorSeccion>
        <Enlace to={"/panel"}>
          {" "}
          <span class="material-icons-outlined">arrow_back_ios</span> Atrás
        </Enlace>

        <div>
          <select
            name="selectorIzquierda"
            id="selectIzquierda"
            onChange={establecerValoresIzquierda}
          >
            <option value={null}>Selecciona Sección :</option>
            {cargarSelector}
          </select>
          <div>
            <Titulo>{nombreSeccionIzquierda}</Titulo>
            <Titulo>{aforoSeccionIzquierda}</Titulo>
          </div>
          <GridBotones>
            <ButtonMenos onClick={decrementarContadorIzquierda}>
              {" "}
              <span className="material-icons-outlined">remove</span>
            </ButtonMenos>
            <Button onClick={incrementarContadorIzquierda}>
              <span className="material-icons-outlined">add</span>
            </Button>
          </GridBotones>
        </div>
      </ContenedorSeccion>

      <ContenedorSeccion>
        <div>
          <select
            name="selectorDerecha"
            id="selecDerecha"
            onChange={establecerValoresDerecha}
          >
            <option value={null}>Selecciona Sección :</option>
            {cargarSelectorDerecha}
          </select>
          <div>
            <Titulo>{nombreSeccionDerecha}</Titulo>
            <Titulo>{aforoSeccionDerecha}</Titulo>
          </div>
          <GridBotones>
            <ButtonMenos onClick={decrementarContadorDerecha}>
              {" "}
              <span className="material-icons-outlined">remove</span>
            </ButtonMenos>
            <Button onClick={incrementarContadorDerecha}>
              <span className="material-icons-outlined">add</span>
            </Button>
          </GridBotones>
        </div>
      </ContenedorSeccion>
    </Contenedor>
  );
}

export default ContadorMultiple;
