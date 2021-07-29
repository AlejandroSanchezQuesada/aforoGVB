import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const Contenedor = styled.div`
  display: ${(props) => props.visible};
`;

const TablaLocales = styled.table`
  width: 100%;
  background-color: #e5f1fb;
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
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #1e1e1e;
    color: white;
    border-color: white;
  }
`;

const ColumnaTablaLocales = styled.td`
  padding-top: 1%;
  padding-bottom: 1%;
`;

const Opciones = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  text-align: right;
  background-color: white;
`;

const CrearBoton = styled.button`
  background-color: green;
  border: solid 1px black;
  border-radius: 5px;
  padding: 2%;
  margin-right: 5%;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const ModificarBoton = styled(CrearBoton)`
  background-color: #ffd900;
`;

const EliminarBoton = styled(CrearBoton)`
  background-color: red;
  &:hover {
    color: white;
  }
`;

function LocalesCRUD(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const [locales, setLocales] = useState([]);

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
      </FilaTablaLocales>
    );
  });

  return (
    <Contenedor visible={props.visible}>
      <Opciones>
        <div></div>
        <div>
          <CrearBoton>
            Crear <i className="fas fa-plus"></i>
          </CrearBoton>
          <ModificarBoton>
            Modificar <i className="fas fa-edit"></i>
          </ModificarBoton>
          <EliminarBoton>
            Eliminar <i className="fas fa-trash"></i>
          </EliminarBoton>
        </div>
      </Opciones>
      <TablaLocales>
        <CabeceraTablaLocales>ID</CabeceraTablaLocales>
        <CabeceraTablaLocales>Nombre</CabeceraTablaLocales>
        <CabeceraTablaLocales>Logo</CabeceraTablaLocales>
        <CabeceraTablaLocales>Administrador</CabeceraTablaLocales>
        {cargarLocales}
      </TablaLocales>
    </Contenedor>
  );
}

export default LocalesCRUD;
