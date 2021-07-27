import { useState } from "react";

import styled from "styled-components";

const Contenedor = styled.div`
  display: grid;
  grid-template-columns: 10vw repeat(auto-fill, 10vw) 10vw;
  width: 100%;
  height: 50px;
  background-color: lightgray;
  @media (max-width: 600px) {
    grid-template-columns: 100%;
    height: auto;
  }
`;

const ContenedorMobile = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  text-align: center;
  font-size: 30px;
`;

const ElementosMobile = styled.div`
  font-size: 20px;
  display: grid;
  grid-template-columns: 100%;
  height: auto;
  width: 100%;
  background-color: lightgray;
  display: ${(props) => props.showMenuMobile};
`;

function NavegacionPanel(props) {
  const [showMenuMobile, setShowMenuMobile] = useState("none");
  const children = props.children;

  function toggleMenu() {
    if (showMenuMobile === "none") {
      setShowMenuMobile("block");
    } else if (showMenuMobile === "block") {
      setShowMenuMobile("none");
    }
  }

  function mostrarPanel() {
    if (window.innerWidth > 600) {
      return <Contenedor>{children}</Contenedor>;
    } else {
      return (
        <ContenedorMobile onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
          <ElementosMobile showMenuMobile={showMenuMobile}>
            {children}
          </ElementosMobile>
        </ContenedorMobile>
      );
    }
  }

  return mostrarPanel();
}

export default NavegacionPanel;
