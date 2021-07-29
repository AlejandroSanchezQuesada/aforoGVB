import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Contenedor = styled.div`
  display: ${(props) => props.visible};
`;

const TablaLocales = styled.table`
  width: 100%;
  background-color: #c7d2fe;
  text-align: center;
  overflow-y: scroll;
  height: 80vh;
  overflow-y: scroll;
  @media (max-width: 600px) {
    width: 100vw;
  }
`;

const CabeceraTablaLocales = styled.th``;

const FilaTablaLocales = styled.tr`
  transition: 0.3s;
  &:hover {
    background-color: #1e293b;
    color: white;
  }
`;

const ColumnaTablaLocales = styled.td`
  padding-top: 1%;
  padding-bottom: 1%;
`;

const ColumnaOpciones = styled(ColumnaTablaLocales)`
  cursor: pointer;
`;

const BarraOpciones = styled.div`
  width: 100%;
  height: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #1e293b;
  text-align: right;
`;

const Boton = styled.button`
  cursor: pointer;
  color: white;
  background-color: #696ae5;
  border: solid 1px transparent;
  margin-right: 10px;
  border-radius: 5px;
  height: 100%;
  width: 100px;
`;

const BotonWarning = styled(Boton)`
  background-color: #f59e0b;
`;

const BotonDanger = styled(Boton)`
  background-color: #f43f5e;
`;

const Modal = styled.div`
  padding: 2%;
  width: 50%;
  height: 50%;
  position: absolute;
  top: 30%;
  left: 30%;
  background-color: #696ae5;
  display: grid;
  grid-template-columns: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  margin-left: 10%;
  height: 30%;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
`;

function LocalesCRUD(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const [locales, setLocales] = useState([]);
  const nombreLocal = useRef();
  const logoLocal = useRef();
  const administrador = useRef();

  function getLocales() {
    // Make a request for a user with a given ID
    axios
      .get("http://192.168.1.98/api/locales")
      .then(function (response) {
        let arrayData = [];
        // handle success
        response.data.data.forEach((local) => {
          arrayData.push(local);
        });

        setLocales(arrayData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function crearLocal() {
    axios
      .post("http://192.168.1.98/api/locales", {
        nombre: nombreLocal,
        logo: logoLocal,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getLocales();
  }, []);

  const cargarLocales = locales.map((local) => {
    return (
      <FilaTablaLocales>
        <ColumnaTablaLocales>{local.id}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{local.nombre}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{local.logo}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{local.administrador}</ColumnaTablaLocales>
        <ColumnaOpciones>
          <span className="material-icons-outlined">more_vert</span>
        </ColumnaOpciones>
      </FilaTablaLocales>
    );
  });

  return (
    <Contenedor visible={props.visible}>
      <BarraOpciones>
        <Boton>Añadir</Boton>
      </BarraOpciones>
      <TablaLocales>
        <CabeceraTablaLocales>ID</CabeceraTablaLocales>
        <CabeceraTablaLocales>Nombre</CabeceraTablaLocales>
        <CabeceraTablaLocales>Logo</CabeceraTablaLocales>
        <CabeceraTablaLocales>Administrador</CabeceraTablaLocales>
        <CabeceraTablaLocales>Acciones</CabeceraTablaLocales>
        {cargarLocales}
      </TablaLocales>
      <Modal>
        <Input type="text" ref={nombreLocal} placeholder="nombre"></Input>
        <Input type="file" ref={logoLocal} placeholder="nombre"></Input>
        <div>
          <BotonDanger>Eliminar</BotonDanger>
          <BotonWarning>Modificar</BotonWarning>
          <BotonWarning onClick={crearLocal}>Crear</BotonWarning>
        </div>
      </Modal>
    </Contenedor>
  );
}

export default LocalesCRUD;
