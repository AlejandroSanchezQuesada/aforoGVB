import axios from "axios";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Constantes from "../../Constantes/constantes";

const ContenedorPrincipal = styled.div`
  width: 100%;
  height: 100vh;
  display: ${(props) => props.visible};
`;

const Contenedor = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;

  grid-template-rows: repeat(autofill, 20vh);
  grid-template-columns: repeat(4, 25%);

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const DivSeccion = styled.div`
  font-family: "parking";
  text-align: center;
  padding-top: 15%;
  background-color: #0f172a;
  color: white;
  width: 80%;
  margin: 10%;
  cursor: pointer;
  border-radius: 5px;
  border: solid 2px lightgray;

  &:hover {
    transition: 0.7s;
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    padding-top: 5%;
    padding-bottom: 5%;
    margin: 0%;
    width: 100%;
    margin-top: 1%;
    margin-bottom: 1%;
  }
`;

const Titulo = styled.p`
  font-size: 30px;
`;

const BarraOpciones = styled.div`
  width: 100%;
  height: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #1e293b;
  text-align: left;
`;

const Boton = styled(Link)`
  cursor: pointer;
  background-color: #82e569;
  border: solid 1px transparent;
  margin-right: 10px;
  border-radius: 5px;
  height: 100%;
  width: 100px;
  color: black;
  padding-bottom: 10px;
  text-decoration: none;
`;

function SeccionContadores(props) {
  const [secciones, setSecciones] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    axios
      .get(Constantes.RUTA_API + "secciones")
      .then(function (response) {
        // handle success
        let data = response.data.data;
        let arrayDatos = [];

        data.forEach((dato) => {
          arrayDatos.push(dato);
        });

        setSecciones(arrayDatos);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const mostrarSecciones = secciones.map((seccion) => (
    <DivSeccion
      key={seccion.id}
      onClick={() => {
        history.push({
          pathname: "/contador/" + seccion.id,
          state: {
            // location state
            update: true,
            seccionId: seccion.id,
            seccionNombre: seccion.nombre,
            seccionAforo: seccion.aforo,
          },
        });
      }}
    >
      <Titulo>{seccion.nombre}</Titulo>
      <Titulo>{seccion.aforo}</Titulo>
    </DivSeccion>
  ));

  return (
    <ContenedorPrincipal visible={props.visible}>
      <BarraOpciones>
        <Boton to={"/contadormultiple"}>Contador Múltiple</Boton>
        <Boton to={"/contadorhibrido"}>Contador Híbrido</Boton>
      </BarraOpciones>
      <Contenedor>{mostrarSecciones}</Contenedor>
    </ContenedorPrincipal>
  );
}

export default SeccionContadores;
