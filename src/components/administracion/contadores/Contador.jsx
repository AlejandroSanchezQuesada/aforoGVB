import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
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

const ButtonDelete = styled(Button)`
  background-color: #fd2b06;
  border: solid #fd2b06 1px;
  &:active {
    transition: 0.3s;
    background-color: #c4260a;
  }
`;

const Titulo = styled.h1`
  font-size: 6vw;

  @media (max-width: 600px) {
    font-size: 50px;
  }
`;

function Contador(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const location = useLocation();
  const [aforo, setAforo] = useState(location.state.seccionAforo);

  function incrementarContador() {
    axios
      .post(Constantes.RUTA_API + "incrementarContador", {
        id: location.state.seccionId,
      })
      .then(function (response) {
        setAforo(response.data.aforo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function decrementarContador() {
    axios
      .post(Constantes.RUTA_API + "decrementarContador", {
        id: location.state.seccionId,
      })
      .then(function (response) {
        setAforo(response.data.aforo);
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
          if (dato.id == location.state.seccionId) {
            setAforo(dato.aforo);
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

  return (
    <Contenedor>
      <div>
        <Titulo>{location.state.seccionNombre}</Titulo>
      </div>
      <div>
        <Titulo>{aforo}</Titulo>
      </div>
      <GridBotones>
        <ButtonMenos onClick={decrementarContador}>
          <span className="material-icons-outlined">remove</span>
        </ButtonMenos>
        <Button onClick={incrementarContador}>
          <span className="material-icons-outlined">add</span>
        </Button>
      </GridBotones>

      <Link to={"/panel"}>Volver atrás</Link>
    </Contenedor>
  );
}
export default Contador;
