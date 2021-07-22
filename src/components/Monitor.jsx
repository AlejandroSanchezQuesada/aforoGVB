import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Contenedor = styled.div`
  font-family: "Parking";
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.colorPrincipal};
  color: ${(props) => props.colorSecundario};
`;

const Navegacion = styled.div`
  display: grid;
  grid-template-columns: 80vw 10vw;
`;

const Titulo = styled.h1`
  font-size: 8vw;
  text-align: center;
`;

const HeaderImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid blue;
`;

HeaderImg.defaultProps = {
  src: "",
};

function Monitor() {
  const [cargado, setCargado] = useState(false);
  const [locales, setLocales] = useState([]);
  const [temas, setTemas] = useState([]);
  const [temaElegido, setTemaElegido] = useState("");

  useEffect(() => {
    axios
      .get("http://apiaforo.test/api/locales")
      .then(function (response) {
        setLocales(response.data.data);
        setCargado(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://apiaforo.test/api/temas")
      .then(function (response) {
        setTemas(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTemaElegido(JSON.parse(localStorage.getItem("tema")));
  }, []);

  const listaLocales = locales.map((local) => (
    <div key={local.id}>
      <HeaderImg
        /* src={"http://apiaforo.test/" + local.logo} */
        src="https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png"
        alt={local.nombre}
      ></HeaderImg>
      <h2>{local.nombre}</h2>
    </div>
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
      return <p>Cargando Locales</p>;
    }
  }

  function temaActual(temaAGuardar) {
    let tema = temas.find((temas) => temas.id == temaAGuardar);
    localStorage.setItem("tema", JSON.stringify(tema));
    setTemaElegido(JSON.parse(localStorage.getItem("tema")));
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
    <Contenedor
      colorPrincipal={temaElegido.colorPrincipal}
      colorSecundario={temaElegido.colorSecundario}
    >
      <Navegacion>
        <Titulo>Selecciona Local</Titulo>
        <div>
          <span>Temas</span>
          <i className="fas fa-palette"></i>
          {cargameLosTemas()}
        </div>
      </Navegacion>

      {cargaLocales()}
    </Contenedor>
  );
}

export default Monitor;
