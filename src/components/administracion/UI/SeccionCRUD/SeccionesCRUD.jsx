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
  grid-template-columns: repeat(6, 15%);
  text-align: center;
  width: 100%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const FilaTablaLocales = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 15%);
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

const BotonSec = styled.button`
  cursor: pointer;
  background-color: #82e569;
  border: solid 1px transparent;
  margin-right: 10px;
  border-radius: 5px;
  height: 50%;
  width: 90%;
  color: black;
`;

const BotonAñadirSec = styled(BotonSec)`
  height: 100%;
  width: 80px;
  color: black;
`;

const BotonWarningSec = styled(BotonSec)`
  background-color: #f59e0b;
`;

const BotonDangerSec = styled(BotonSec)`
  background-color: #f43f5e;
`;

const ModalSecc = styled.div`
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

const SpanCerrar = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;

  &:hover {
    background-color: lightblue;
  }
`;

function SeccionesCRUD(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const [secciones, setSecciones] = useState([]);
  const nombreSeccion = useRef();
  const aforoSeccion = useRef();
  const localSeccion = useRef();
  const [idSeccion, setIdSeccion] = useState("");
  const [imagenSeccion, setImagenSeccion] = useState("");
  const [showModalCrearSeccion, setShowModalCrearSeccion] = useState("none");

  function createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImagenSeccion(e.target.result);
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

  function getSecciones() {
    // Make a request for a user with a given ID
    axios
      .get("http://192.168.1.98/api/secciones")
      .then(function (response) {
        let arrayData = [];
        // handle success
        response.data.data.forEach((seccion) => {
          arrayData.push(seccion);
        });

        setSecciones(arrayData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function crearSeccion() {
    run().catch((err) => console.log(err));
    async function run() {
      const blob = await fetch(imagenSeccion).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("nombre", nombreSeccion.current.value);
      formData.append("aforo", aforoSeccion.current.value);
      formData.append("local", localSeccion.current.value);

      // Post the form, just make sure to set the 'Content-Type' header
      const res = await axios.post(
        "http://192.168.1.98/api/secciones",
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

  function modificarSeccion() {
    run().catch((err) => console.log(err));
    async function run() {
      const blob = await fetch(imagenSeccion).then((res) => res.blob());

      const formData = new FormData();
      formData.append("id", idSeccion);
      formData.append("file", blob);
      formData.append("nombre", nombreSeccion.current.value);
      formData.append("aforo", aforoSeccion.current.value);
      formData.append("local", localSeccion.current.value);

      // Post the form, just make sure to set the 'Content-Type' header
      const res = await axios.post(
        "http://192.168.1.98/api/secciones/update",
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

  function eliminarSeccion() {
    axios
      .delete("http://192.168.1.98/api/secciones/1", {
        id: idSeccion,
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
    setIdSeccion(idLocal);
    setShowModalCrearSeccion("grid");

    if (showModalCrearSeccion != "grid") {
      setShowModalCrearSeccion("grid");
    } else if (showModalCrearSeccion != "none") {
      setShowModalCrearSeccion("none");
    }
  }

  useEffect(() => {
    getSecciones();
  }, []);

  const cargarSecciones = secciones.map((seccion) => {
    return (
      <FilaTablaLocales key={seccion.id}>
        <ColumnaTablaLocales>{seccion.id}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{seccion.nombre}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{seccion.imagen}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{seccion.aforo}</ColumnaTablaLocales>
        <ColumnaTablaLocales>{seccion.local}</ColumnaTablaLocales>
        <ColumnaOpciones
          onClick={() => {
            toggleModal(seccion.id);
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
        <BotonAñadirSec onClick={getSecciones}>
          <span className="material-icons-outlined">sync</span>
        </BotonAñadirSec>
        <BotonAñadirSec onClick={toggleModal}>
          <span className="material-icons-outlined">add_box</span>
        </BotonAñadirSec>
      </BarraOpciones>
      <TablaLocales>
        <CabeceraTablaLocales>
          <span>ID</span>
          <span>Nombre</span>
          <span>Imagen</span>
          <span>Aforo</span>
          <span>Local</span>
          <span>Acciones</span>
        </CabeceraTablaLocales>
        {cargarSecciones}
      </TablaLocales>
      <ModalSecc visible={showModalCrearSeccion}>
        <Input
          type="text"
          ref={nombreSeccion}
          placeholder="Nombre de la Sección"
        ></Input>
        <Input
          type="number"
          ref={aforoSeccion}
          placeholder="Cantidad de Aforo Inicial"
        ></Input>
        <Input
          type="number"
          ref={localSeccion}
          placeholder="ID del Local"
        ></Input>
        <Input type="file" onChange={cambiaImagen} placeholder="nombre"></Input>
        <GridBotones>
          <BotonDangerSec onClick={eliminarSeccion}>Eliminar</BotonDangerSec>
          <BotonWarningSec onClick={modificarSeccion}>
            Modificar
          </BotonWarningSec>
          <BotonSec onClick={crearSeccion}>Crear</BotonSec>
          <SpanCerrar onClick={toggleModal}>Cerrar</SpanCerrar>
        </GridBotones>
      </ModalSecc>
    </Contenedor>
  );
}

export default SeccionesCRUD;
