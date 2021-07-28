import styled from "styled-components";
import SeccionCRUDFooter from "./SeccionCRUD/SeccionCRUDFooter";
import { useState } from "react";

const DivPruebas = styled.div`
  display: ${(props) => props.visible};
`;

function SeccionCRUD() {
  const [showLocales, setShowLocales] = useState("none");
  const [showSecciones, setShowSecciones] = useState("none");
  const [showUsuarios, setShowUsuarios] = useState("none");

  function mostrarLocales() {
    setShowLocales("block");
    setShowSecciones("none");
    setShowUsuarios("none");
  }

  function mostrarSecciones() {
    setShowLocales("none");
    setShowSecciones("block");
    setShowUsuarios("none");
  }

  function mostrarUsuarios() {
    setShowLocales("none");
    setShowSecciones("none");
    setShowUsuarios("block");
  }

  return (
    <div>
      <h1>Seccion CRUD</h1>
      <DivPruebas visible={showLocales}>Locales</DivPruebas>
      <DivPruebas visible={showSecciones}>Secciones</DivPruebas>
      <DivPruebas visible={showUsuarios}>Usuarios</DivPruebas>

      <SeccionCRUDFooter
        toggleLocales={mostrarLocales}
        toggleSecciones={mostrarSecciones}
        toggleUsuarios={mostrarUsuarios}
      ></SeccionCRUDFooter>
    </div>
  );
}

export default SeccionCRUD;
