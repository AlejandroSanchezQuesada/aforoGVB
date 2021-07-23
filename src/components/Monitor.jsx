import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Contenedor = styled.div`
  font-family: "Parking";
  width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.colorPrincipal};
  color: ${(props) => props.colorSecundario};
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
  width: 100px;
  height: 90px;
  margin-top: 10px;
`;

HeaderImg.defaultProps = {
  src: "",
};

function Monitor() {
  const [cargado, setCargado] = useState(false);
  const [locales, setLocales] = useState([]);
  const [temas, setTemas] = useState([]);
  const [temaElegido, setTemaElegido] = useState("");
  const history = useHistory();

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
        src="https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png"
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
        <Titulo>Lista de Locales</Titulo>
        <DivTemas>{cargameLosTemas()}</DivTemas>
      </Navegacion>
      <ContenedorLocales>{cargaLocales()}</ContenedorLocales>
    </Contenedor>
  );
}

export default Monitor;