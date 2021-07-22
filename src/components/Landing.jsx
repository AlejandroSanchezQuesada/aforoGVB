import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Contenedor = styled.div`
  font-family: "parking";
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100vw;
  height: 100vh;

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const Bloque = styled.div`
  background-color: yellow;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Bloque2 = styled(Bloque)`
  background-color: green;
`;

const Titulo = styled.h1`
  font-size: 10vw;
  cursor: pointer;
`;

function Landing() {
  let history = useHistory();

  function direccion(nombreDireccion) {
    history.push(nombreDireccion);
  }

  return (
    <Contenedor>
      <Bloque
        onClick={() => {
          direccion("monitor");
        }}
      >
        <Titulo>Monitor</Titulo>
      </Bloque>

      <Bloque2
        onClick={() => {
          direccion("login");
        }}
      >
        <Titulo>Login</Titulo>
      </Bloque2>
    </Contenedor>
  );
}

export default Landing;
