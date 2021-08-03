import styled from "styled-components";
import { useState } from "react";
import LocalesCRUD from "./SeccionCRUD/LocalesCRUD";
import SeccionesCRUD from "./SeccionCRUD/SeccionesCRUD";
import UsuariosCRUD from "./SeccionCRUD/UsuariosCRUD";
import TemasCRUD from "./SeccionCRUD/TemasCRUD";

const DivPruebas = styled.div`
  display: ${(props) => props.visible};
`;

const BarraOpciones = styled.div`
  width: 100%;
  height: 30px;
  background-color: #1e293b;
`;

const Boton = styled.button`
  background-color: #696ae5;
  border: solid 1px transparent;
  margin-right: 10px;
  border-radius: 5px;
  height: 100%;
  width: 100px;
  cursor: pointer;
`;

const BotonWarning = styled(Boton)`
  background-color: #f59e0b;
`;

const BotonDanger = styled(Boton)`
  background-color: #f43f5e;
`;

const DivBotonEscogerSeccion = styled.div`
  height: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 25%);
`;

function SeccionCRUD() {
  const [showLocales, setShowLocales] = useState("block");
  const [showSecciones, setShowSecciones] = useState("none");
  const [showUsuarios, setShowUsuarios] = useState("none");
  const [showTemas, setShowTemas] = useState("none");

  function mostrarLocales() {
    setShowLocales("block");
    setShowSecciones("none");
    setShowUsuarios("none");
    setShowTemas("none");
  }

  function mostrarSecciones() {
    setShowLocales("none");
    setShowSecciones("block");
    setShowUsuarios("none");
    setShowTemas("none");
  }

  function mostrarUsuarios() {
    setShowLocales("none");
    setShowSecciones("none");
    setShowUsuarios("block");
    setShowTemas("none");
  }

  function mostrarTemas() {
    setShowLocales("none");
    setShowSecciones("none");
    setShowUsuarios("none");
    setShowTemas("block");
  }

  return (
    <div>
      <DivBotonEscogerSeccion>
        <Boton onClick={mostrarLocales}>Locales</Boton>
        <Boton onClick={mostrarSecciones}>Secciones</Boton>
        <Boton onClick={mostrarUsuarios}>Usuarios</Boton>
        <Boton onClick={mostrarTemas}>Temas</Boton>
      </DivBotonEscogerSeccion>
      <LocalesCRUD visible={showLocales}></LocalesCRUD>
      <SeccionesCRUD visible={showSecciones}></SeccionesCRUD>
      <UsuariosCRUD visible={showUsuarios}></UsuariosCRUD>
      <TemasCRUD visible={showTemas}></TemasCRUD>
    </div>
  );
}

export default SeccionCRUD;
