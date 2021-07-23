import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  font-family: "parking";
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.colorPrincipal};
  color: ${(props) => props.colorSecundario};
`;

const ContenedorLocal = styled.div`
  display: grid;
  grid-template-columns: 100% 100%;
  grid-template-rows: auto auto;
  text-align: center;
`;

const ContenedorSecciones = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const Titulo = styled.p`
  font-size: 6vw;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const TituloSeccion = styled(Titulo)`
  font-size: 5vw;
  color: ${(props) => props.colorSecundario3};
  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const TituloAforoTotal = styled(Titulo)`
  font-size: 5vw;
  color: ${(props) => props.colorSecundario2};
  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const HeaderImg = styled.img`
  width: 20vw;
  height: 5vh;
`;

HeaderImg.defaultProps = {
  src: "",
};

function MonitorSecciones(props) {
  let { nLocal } = useParams();
  const [local, setLocal] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [temaElegido, setTemaElegido] = useState("");
  const [aforoTotal, setAforoTotal] = useState(0);

  /* Obtener Local y cargar tema */
  useEffect(() => {
    setTemaElegido(JSON.parse(localStorage.getItem("tema")));

    axios
      .post("http://apiaforo.test/api/local", {
        id: nLocal,
      })
      .then(function (response) {
        setLocal(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [nLocal]);
  /* Obtener Secciones cada 3 segundos */
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .post("http://apiaforo.test/api/getSeccionesLocal", {
          local: nLocal,
        })
        .then(function (response) {
          setSecciones(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 3000);

    return () => clearInterval(interval);
  });

  const cargaLocal = () => {
    if (local.length === 0) {
      return <Titulo>Cargando Nombre Local</Titulo>;
    } else {
      return (
        <div>
          <HeaderImg src={local.logo}></HeaderImg>
          <Titulo>{local.nombre}</Titulo>
        </div>
      );
    }
  };

  const mapearSecciones = secciones.map((seccion) => {
    return (
      <div key={seccion.id}>
        <TituloSeccion colorSecundario3={temaElegido.colorSecundario3}>
          {seccion.nombre}
        </TituloSeccion>
        <TituloSeccion colorSecundario3={temaElegido.colorSecundario3}>
          {seccion.aforo}
        </TituloSeccion>
      </div>
    );
  });

  function contadorAforoTotal() {
    let n = aforoTotal;
    secciones.forEach((seccion) => {
      n += seccion.aforo;
    });

    return n;
  }

  const cargaSecciones = () => {
    if (secciones.length === 0) {
      return <p>Cargando Secciones</p>;
    } else {
      return mapearSecciones;
    }
  };

  return (
    <Contenedor
      colorPrincipal={temaElegido.colorPrincipal}
      colorSecundario={temaElegido.colorSecundario}
    >
      <ContenedorLocal>
        <div colorSecundario2={temaElegido.colorSecundario2}>
          {cargaLocal()}
          <TituloAforoTotal colorSecundario2={temaElegido.colorSecundario2}>
            AFORO TOTAL {contadorAforoTotal()}
          </TituloAforoTotal>
        </div>
      </ContenedorLocal>

      <ContenedorSecciones>{cargaSecciones()}</ContenedorSecciones>
    </Contenedor>
  );
}

export default MonitorSecciones;
