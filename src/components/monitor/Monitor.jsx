import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Contenedor = styled.div`
  font-family: "Parking";
  width: 100vw;
  min-height: 100vh;
  background-color: #e5f1fb;
  color: #1e1e1e;
`;

const Navegacion = styled.div`
  display: grid;
  grid-template-columns: 80vw 10vw;

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const ContenedorLocales = styled.div`
  margin-top: 2%;
  padding-bottom: 5%;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  text-align: center;
  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const DivTemas = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
`;
const Titulo = styled.h1`
  font-size: 5vw;
  text-align: center;
`;

const EnlaceLocal = styled.div`
  cursor: pointer;
`;

const HeaderImg = styled.img`
  width: 200px;
  height: 180px;
  margin-top: 10px;
`;

HeaderImg.defaultProps = {
  src: "",
};

function Monitor() {
  const [cargado, setCargado] = useState(false);
  const [locales, setLocales] = useState([]);
  const [temas, setTemas] = useState([]);
  //const [temaElegido, setTemaElegido] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://192.168.1.98/api/locales")
      .then(function (response) {
        setLocales(response.data.data);
        setCargado(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://192.168.1.98/api/temas")
      .then(function (response) {
        setTemas(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    //setTemaElegido(JSON.parse(localStorage.getItem("tema")));
  }, []);

  const listaLocales = locales.map((local) => (
    <EnlaceLocal
      key={local.id}
      onClick={() => {
        history.push({
          pathname: "/secciones/" + local.id,
          state: {
            // location state
            update: true,
            nLocal: local.id,
            data: "hola",
          },
        });
      }}
    >
      <HeaderImg
        src={"http://192.168.1.98/" + local.logo}
        alt={local.nombre}
      ></HeaderImg>
      <h2>{local.nombre}</h2>
    </EnlaceLocal>
  ));

  const cargaTemas = temas.map((tema) => {
    return (
      <option key={tema.id} value={tema.id}>
        {tema.nombre}
      </option>
    );
  });

  function cargaLocales() {
    if (cargado) {
      return listaLocales;
    } else {
      return (
        <p>
          Cargando Locales... Esto debería tardar menos de 10 segundos. Si pasa
          este tiempo refresca la página
        </p>
      );
    }
  }

  function temaActual(temaAGuardar) {
    let tema = temas.find((temas) => temas.id == temaAGuardar);
    localStorage.setItem("tema", JSON.stringify(tema));
    //setTemaElegido(JSON.parse(localStorage.getItem("tema")));
  }

  function cargameLosTemas() {
    return (
      <div>
        <label htmlFor="seleccionarTemas">Elige un tema</label>
        <select
          name="seleccionarTemas"
          id="seleccionarTemas"
          onChange={(event) => {
            temaActual(event.target.value);
          }}
        >
          {cargaTemas}
        </select>
      </div>
    );
  }

  return (
    <Contenedor>
      <Navegacion>
        <Titulo>Lista de Locales</Titulo>
        <DivTemas>{cargameLosTemas()}</DivTemas>
      </Navegacion>
      <ContenedorLocales>{cargaLocales()}</ContenedorLocales>
    </Contenedor>
  );
}

export default Monitor;
