import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Contenedor = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  font-family: "parking";
  text-align: center;
`;

const GridBotones = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 50%));
  margin: 5%;
`;

const Button = styled.button`
  width: 90%;
  padding: 5vh;
  margin: 1vh;
  background-color: #00b74a;
  color: white;
  font-size: 7vh;
  border: solid #00b74a 1px;
  border-radius: 10px;
  &:focus {
    -webkit-box-shadow: inset 0px 0px 10px #00b74a;
    -moz-box-shadow: inset 0px 0px 10px #00b74a;
    box-shadow: inset 0px 0px 10px #00b74a;
    outline: none;
  }
`;

function Contador(props) {
  const location = useLocation();
  const [aforo, setAforo] = useState(location.state.seccionAforo);

  return (
    <Contenedor>
      <div>
        <h1>{location.state.seccionNombre}</h1>
      </div>
      <div>
        <h1>{aforo}</h1>
      </div>
      <GridBotones>
        <Button>+</Button>
        <Button>-</Button>
        <Button>
          <i className="fas fa-trash"></i>
        </Button>
      </GridBotones>
      <div>Volver atrás</div>
    </Contenedor>
  );
}
export default Contador;
