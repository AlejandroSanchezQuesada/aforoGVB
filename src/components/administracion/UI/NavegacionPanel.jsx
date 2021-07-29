import { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

const Contenedor = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  background-color: #1e293b;
  color: white;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(auto-fill, 10vh);
  z-index: 99;

  @media (max-width: 600px) {
    transition: 1s;
    display: ${(props) => props.visible};
  }
`;

const Opcion = styled.div`
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Tarjeta = styled.div`
  width: 80%;
  height: 50%;
  background-color: #0f172a;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2%;

  &:hover {
    font-weight: bold;
  }
`;

const TarjetaCerrarSesion = styled(Opcion)`
  grid-row-start: 10;
  grid-row-end: 11;
`;

const TopBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: fixed;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  text-align: right;
  margin-bottom: 50px;
`;

const ElementosTopBar = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  grid-column-start: 5;
  grid-column-end: 6;
`;

const BurgerMenu = styled(ElementosTopBar)`
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  display: hidden;
  grid-column-start: 1;
  grid-column-end: 2;
  cursor: pointer;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const DivModal = styled.div`
  width: 100%;
  background-color: #0f172a;
  margin-top: 50px;
  padding-bottom: -50px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.1;
  display: none;

  @media (max-width: 600px) {
    display: ${(props) => props.visible};
  }
`;

function NavegacionPanel(props) {
  const [visibleMenuMobile, setVisibleMenuMobile] = useState("none");
  let history = useHistory();

  function openVisibleMenu() {
    setVisibleMenuMobile("block");
  }

  function closeVisibleMenu() {
    setVisibleMenuMobile("none");
  }

  function cerrarSesion() {
    localStorage.setItem("token", "");
    history.push("/login");
  }

  return (
    <div>
      <TopBar>
        <BurgerMenu onClick={openVisibleMenu}>
          <span className="material-icons-outlined">menu</span>
        </BurgerMenu>
        <ElementosTopBar>
          Nombre de Usuario
          <span className="material-icons-outlined">face</span>
        </ElementosTopBar>
      </TopBar>

      <Contenedor visible={visibleMenuMobile}>
        <Opcion>Opciones</Opcion>
        <Opcion>
          <Tarjeta>
            Gestión <span className="material-icons-outlined">settings</span>
          </Tarjeta>
        </Opcion>
        <Opcion>
          <Tarjeta>
            Análisis <span className="material-icons-outlined">analytics</span>
          </Tarjeta>
        </Opcion>
        <TarjetaCerrarSesion>
          <Tarjeta onClick={cerrarSesion}>
            Cerrar Sesión
            <span className="material-icons-outlined">logout</span>
          </Tarjeta>
        </TarjetaCerrarSesion>
      </Contenedor>
      <DivModal
        visible={visibleMenuMobile}
        onClick={closeVisibleMenu}
      ></DivModal>
    </div>
  );
}

export default NavegacionPanel;
