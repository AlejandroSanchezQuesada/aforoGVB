import styled from "styled-components";
import { useState } from "react";
import LocalesCRUD from "./SeccionCRUD/LocalesCRUD";

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
`;

const BotonWarning = styled(Boton)`
  background-color: #f59e0b;
`;

const BotonDanger = styled(Boton)`
  background-color: #f43f5e;
`;

function SeccionCRUD() {
  const [showLocales, setShowLocales] = useState("block");
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
      <LocalesCRUD></LocalesCRUD>
    </div>
  );
}

export default SeccionCRUD;
