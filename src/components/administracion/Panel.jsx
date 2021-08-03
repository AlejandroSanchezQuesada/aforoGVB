import styled from "styled-components";
import { useState } from "react";

/* Componentes */
import NavegacionPanel from "./UI/NavegacionPanel";
import SeccionContadores from "./UI/SeccionContadores";
import SeccionCRUD from "./UI/SeccionCRUD";

const Contenedor = styled.div`
  font-family: "ataper";
  background-color: #c7d2fe;
  height: 100vh;
`;

const ContenedorSecciones = styled.div`
  padding-top: 50px;
  margin-left: 250px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

function Panel() {
  const [showSecciones, setShowSecciones] = useState("block");
  const [showCRUD, setShowCRUD] = useState("none");
  const [showAnalisis, setShowAnalisis] = useState("none");

  function mostrarSecciones() {
    setShowSecciones("block");
    setShowCRUD("none");
    setShowAnalisis("none");
  }

  function mostrarCRUD() {
    setShowSecciones("none");
    setShowCRUD("block");
    setShowAnalisis("none");
  }

  function mostrarAnalisis() {
    setShowSecciones("none");
    setShowCRUD("none");
    setShowAnalisis("block");
  }

  return (
    <Contenedor>
      <NavegacionPanel
        mostrarSecciones={mostrarSecciones}
        mostrarCRUD={mostrarCRUD}
        mostrarAnalisis={mostrarAnalisis}
      ></NavegacionPanel>

      <ContenedorSecciones>
        <SeccionContadores visible={showSecciones}></SeccionContadores>
        <SeccionCRUD visible={showCRUD}></SeccionCRUD>
      </ContenedorSecciones>
    </Contenedor>
  );
}

export default Panel;
