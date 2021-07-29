import styled from "styled-components";

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
  return (
    <Contenedor>
      <NavegacionPanel></NavegacionPanel>

      <ContenedorSecciones>
        {/* <SeccionContadores></SeccionContadores> */}
        <SeccionCRUD></SeccionCRUD>
      </ContenedorSecciones>
    </Contenedor>
  );
}

export default Panel;
