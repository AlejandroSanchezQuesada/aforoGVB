import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { readFileSync as fs } from "fs";

const Contenedor = styled.div`
  display: ${(props) => props.visible};
`;

const TablaLocales = styled.div`
  width: 100%;
  background-color: #c7d2fe;
  text-align: center;
  height: 80vh;
  display: grid;
  grid-template-columns: 100%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CabeceraTablaLocales = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  text-align: center;
  width: 100%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const FilaTablaLocales = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #1e293b;
    color: white;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ColumnaTablaLocales = styled.div`
  padding-top: 1%;
  padding-bottom: 1%;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    width: 50px;
  }
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
  background-color: #82e569;
  border: solid 1px transparent;
  margin-right: 10px;
  border-radius: 5px;
  height: 50%;
  width: 90%;
  color: black;
`;

const BotonAñadir = styled(Boton)`
  height: 100%;
  width: 80px;
  color: black;
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
  display: ${(props) => props.visible};
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

const GridBotones = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  text-align: center;
`;

function LocalesCRUD(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const [locales, setLocales] = useState([]);
  const nombreLocal = useRef();
  const [idLocal, setIdLocal] = useState("");
  const [imagenLocal, setImagenLocal] = useState("");
  const [showModalCrearLocal, setShowModalCrearLocal] = useState("none");

  function createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImagenLocal(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function cambiaImagen(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    } else {
      createImage(files[0]);
    }
  }

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
    run().catch((err) => console.log(err));
    async function run() {
      const blob = await fetch(imagenLocal).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("nombre", nombreLocal.current.value);

      // Post the form, just make sure to set the 'Content-Type' header
      const res = await axios.post(
        "http://192.168.1.98/api/locales",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.statusText);
    }
  }

  function modificarLocal() {
    run().catch((err) => console.log(err));
    async function run() {
      const blob = await fetch(imagenLocal).then((res) => res.blob());

      const formData = new FormData();
      formData.append("id", idLocal);
      formData.append("file", blob);
      formData.append("nombre", nombreLocal.current.value);

      // Post the form, just make sure to set the 'Content-Type' header
      const res = await axios.post(
        "http://192.168.1.98/api/locales/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.statusText);
    }
  }

  function eliminarLocal() {
    axios
      .delete("http://192.168.1.98/api/locales/1", {
        id: idLocal,
      })
      .then(function (response) {
        console.log(response);
        alert(response.statusText);
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  }

  function toggleModal(idLocal = 0) {
    setIdLocal(idLocal);
    setShowModalCrearLocal("grid");

    if (showModalCrearLocal != "grid") {
      setShowModalCrearLocal("grid");
    } else if (showModalCrearLocal != "none") {
      setShowModalCrearLocal("none");
    }
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
        <ColumnaOpciones
          onClick={() => {
            toggleModal(local.id);
          }}
        >
          <span className="material-icons-outlined">more_vert</span>
        </ColumnaOpciones>
      </FilaTablaLocales>
    );
  });

  return (
    <Contenedor visible={props.visible}>
      <BarraOpciones>
        <BotonAñadir onClick={getLocales}>
          <span className="material-icons-outlined">sync</span>
        </BotonAñadir>
        <BotonAñadir onClick={toggleModal}>
          <span className="material-icons-outlined">add_box</span>
        </BotonAñadir>
      </BarraOpciones>
      <TablaLocales>
        <CabeceraTablaLocales>
          <span>ID</span>
          <span>Nombre</span>
          <span>Logo</span>
          <span>Admin</span>
          <span>Acciones</span>
        </CabeceraTablaLocales>
        {cargarLocales}
      </TablaLocales>
      <Modal visible={showModalCrearLocal}>
        <Input
          type="text"
          ref={nombreLocal}
          placeholder="Nombre del Local"
        ></Input>
        <Input type="file" onChange={cambiaImagen} placeholder="nombre"></Input>
        <GridBotones>
          <BotonDanger onClick={eliminarLocal}>Eliminar</BotonDanger>
          <BotonWarning onClick={modificarLocal}>Modificar</BotonWarning>
          <Boton onClick={crearLocal}>Crear</Boton>
          <span onClick={toggleModal}>Cerrar</span>
        </GridBotones>
      </Modal>
    </Contenedor>
  );
}

export default LocalesCRUD;
