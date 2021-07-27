import styled from "styled-components";

/* Componentes */
import NavegacionPanel from "./UI/NavegacionPanel";
import SeccionContadores from "./UI/SeccionContadores";
import SeccionCRUD from "./UI/SeccionCRUD";

const Contenedor = styled.div`
  font-family: "ataper";
`;

const Logo = styled.div`
  margin: 5%;
  background-color: gray;
  color: black;
  border: solid 2px black;
  border-radius: 10px;
  transition: 0.3s;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
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
  return (
    <Contenedor>
      <NavegacionPanel>
        <Logo>Administración</Logo>
        <Titulo>Contadores</Titulo>
        <Titulo>Administración</Titulo>
        <Titulo>Administración</Titulo>
        <Titulo>Administración</Titulo>
        <Titulo>Administración</Titulo>
      </NavegacionPanel>
      {/* <SeccionContadores></SeccionContadores> */}
      <SeccionCRUD></SeccionCRUD>
    </Contenedor>
  );
}

export default Panel;
