import styled from "styled-components";
import { useHistory } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

/* Componentes */
import NavegacionPanel from "./UI/NavegacionPanel";
import SeccionContadores from "./UI/SeccionContadores";

const Contenedor = styled.div`
  font-family: "ataper";
`;

const Titulo = styled.div`
  transition: 0.3s;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: solid 2px transparent;
  margin: 5%;
  &:hover {
    font-weight: bolder;
    text-decoration: underline;
  }
`;

function Panel() {
  const history = useHistory();

  /*  function aContadores() {
    history.push({
      pathname: "/contador/" + seccion.id,
      state: {
        // location state
        update: true,
        seccionId: local.id,
      },
    });
  } */

  return (
    <Contenedor>
      <NavegacionPanel>
        <Titulo>Administración</Titulo>
        <Titulo>Contadores</Titulo>
        <Titulo>Administración</Titulo>
        <Titulo>Administración</Titulo>
        <Titulo>Administración</Titulo>
        <Titulo>Administración</Titulo>
      </NavegacionPanel>
      <SeccionContadores></SeccionContadores>
    </Contenedor>
  );
}

export default Panel;
