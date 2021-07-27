import styled from "styled-components";

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
