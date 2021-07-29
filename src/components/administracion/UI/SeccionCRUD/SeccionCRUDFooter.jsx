import styled from "styled-components";
import { useLocation } from "react-router";

const NavOpciones = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  text-align: center;
  background-color: lightgray;

  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: 0.5%;
  padding-top: 0.5%;
  @media (max-width: 600px) {
    padding-bottom: 2%;
    padding-top: 2%;
  }
`;

const Opciones = styled.div`
  cursor: pointer;
  &:hover {
    transition: 0.7s;
    opacity: 0.8;
  }
`;

const SeccionCRUDFooter = (props) => {
  return (
    <NavOpciones>
      <Opciones onClick={props.toggleLocales}>
        <i className="fas fa-store-alt"></i>
        <p>Locales</p>
      </Opciones>
      <Opciones onClick={props.toggleSecciones}>
        <i className="fas fa-people-arrows"></i>
        <p>Secciones</p>
      </Opciones>
      <Opciones onClick={props.toggleUsuarios}>
        <i className="fas fa-user-cog"></i>
        <p>Usuarios</p>
      </Opciones>
    </NavOpciones>
  );
};

export default SeccionCRUDFooter;
