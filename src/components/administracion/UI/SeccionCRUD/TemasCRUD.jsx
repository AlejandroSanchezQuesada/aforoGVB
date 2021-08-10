import styled from "styled-components";
import axios from "axios";
import { useRef, useState } from "react";
import Constantes from "../../../Constantes/constantes";

const Contenedor = styled.div`
  display: ${(props) => props.visible};
  height: 100%;
  background-color: #c7d2fe;
`;

const BarraOpciones = styled.div`
  width: 100%;
  height: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #1e293b;
  text-align: right;
`;

const ContenedorFormularioRegistro = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80%);
  grid-template-rows: repeat(auto-fill, 40px);
  height: 100%;

  padding-top: 2%;
  margin-left: 15%;
`;

const Input = styled.input`
  height: 25px;
`;

const Button = styled.button`
  border: solid 1px #82e569;
  background-color: #82e569;
  border-radius: 5px;

  &:hover {
    transition: 0.3s;
    background-color: #5fa84d;
  }
`;

const ContenedorPreview = styled.div`
  border-top: solid 1px black;
  margin-top: 2%;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.colorPrincipal};
  text-align: center;
  font-family: "parking";
`;

const TituloPreview = styled.p`
  font-size: 20px;
  color: ${(props) => props.colorSecundario};
`;

const TituloPreview2 = styled.p`
  font-size: 20px;
  color: ${(props) => props.colorSecundario2};
`;

const TituloPreview3 = styled.p`
  font-size: 20px;
  color: ${(props) => props.colorSecundario3};
`;

const TituloPreview4 = styled.p`
  font-size: 20px;
  color: ${(props) => props.colorSecundario4};
`;

const TituloPreview5 = styled.p`
  font-size: 20px;
  color: ${(props) => props.colorSecundario5};
`;

function TemasCRUD(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const nombre = useRef("");
  const [colorPrincipal, setColorPrincipal] = useState("#000000");
  const [colorSecundario, setColorSecundario] = useState("#000000");
  const [colorSecundario2, setColorSecundario2] = useState("#000000");
  const [colorSecundario3, setColorSecundario3] = useState("#000000");
  const [colorSecundario4, setColorSecundario4] = useState("#000000");
  const [colorSecundario5, setColorSecundario5] = useState("#000000");

  function crearTema() {
    axios
      .post(Constantes.RUTA_API + "temas", {
        nombre: nombre.current.value,
        colorPrincipal: colorPrincipal,
        colorSecundario: colorSecundario,
        colorSecundario2: colorSecundario2,
        colorSecundario3: colorSecundario3,
        colorSecundario4: colorSecundario4,
        colorSecundario5: colorSecundario5,
      })
      .then(function (response) {
        alert(response.statusText);

        nombre.current.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Contenedor visible={props.visible}>
      <BarraOpciones></BarraOpciones>
      <ContenedorFormularioRegistro>
        <Input ref={nombre} placeholder="Nombre *" type="text"></Input>
        <p>
          Color Principal :
          <Input
            onChange={(e) => {
              setColorPrincipal(e.target.value);
            }}
            type="color"
          ></Input>
        </p>

        <p>
          Color Secundario :
          <Input
            onChange={(e) => {
              setColorSecundario(e.target.value);
            }}
            type="color"
          ></Input>
        </p>
        <p>
          Color Secundario 2 :
          <Input
            onChange={(e) => {
              setColorSecundario2(e.target.value);
            }}
            type="color"
          ></Input>
        </p>
        <p>
          Color Secundario 3 :
          <Input
            onChange={(e) => {
              setColorSecundario3(e.target.value);
            }}
            type="color"
          ></Input>
        </p>
        <p>
          Color Secundario 4 :
          <Input
            onChange={(e) => {
              setColorSecundario4(e.target.value);
            }}
            type="color"
          ></Input>
        </p>

        <p>
          Color Secundario 5 :
          <Input
            onChange={(e) => {
              setColorSecundario5(e.target.value);
            }}
            type="color"
          ></Input>
        </p>

        <Button onClick={crearTema}>Crear Tema</Button>
      </ContenedorFormularioRegistro>
      <p>Preview del Tema ⬇</p>
      <ContenedorPreview colorPrincipal={colorPrincipal}>
        <TituloPreview colorSecundario={colorSecundario}>
          Hola soy el color Secundario el fondo es el principal
        </TituloPreview>
        <TituloPreview2 colorSecundario2={colorSecundario2}>
          Color secundario 2
        </TituloPreview2>
        <TituloPreview3 colorSecundario3={colorSecundario3}>
          Color secundario 3
        </TituloPreview3>
        <TituloPreview4 colorSecundario4={colorSecundario4}>
          Color secundario 4
        </TituloPreview4>
        <TituloPreview5 colorSecundario5={colorSecundario5}>
          Color secundario 5
        </TituloPreview5>
      </ContenedorPreview>
    </Contenedor>
  );
}

export default TemasCRUD;
