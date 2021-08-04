import styled from "styled-components";
import {
  BarChart,
  Legend,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Contenedor = styled.div`
  display: ${(props) => props.visible};
`;

const ContenedorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 25vw);
  grid-template-rows: repeat(auto-fill, 25vh);

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 100vw);
    grid-template-rows: repeat(auto-fill, 40vh);
  }
`;

const ContenedorSeccion = styled.div`
  display: grid;
  grid-template-columns: 100%;
  width: 100%;
  height: 99%;
  border: solid 2px red;
`;

function SeccionAnalisis(props) {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 420, pv: 2300, amt: 2230 },
    { name: "Page C", uv: 350, pv: 2590, amt: 2123 },
    { name: "Page D", uv: 500, pv: 2220, amt: 5000 },
  ];

  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const [seccionesDia, setSeccionesDia] = useState([]);
  const [seccionDia, setSeccionDia] = useState([]);
  const [aforoHoraDeterminada, setAforoHoraDeterminada] = useState([]);
  const [maximosDia, setMaximosDia] = useState([]);
  const [maximosDiaSeccion, setMaximosDiaSeccion] = useState([]);
  const [maximosSeccion, setMaximosSeccion] = useState([]);

  const fecha = useRef("");
  const idSeccion = useRef("");
  const hora = useRef("");

  function obtenerMediaSeccionesDia() {
    axios
      .post("http://192.168.1.98/api/getSeccionesDia", {
        fecha: fecha.current.value,
      })
      .then(function (response) {
        let a = [];
        response.data.forEach((dato) => {
          a.push(dato);
        });

        setSeccionesDia(a);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function obtenerMediaSeccion() {
    axios
      .post("http://192.168.1.98/api/getSeccionDia", {
        fecha: fecha.current.value,
        id: idSeccion.current.value,
      })
      .then(function (response) {
        let a = [];
        response.data.forEach((dato) => {
          a.push(dato);
        });

        setSeccionDia(a);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function obtenerAforoDeterminado() {
    axios
      .post("http://192.168.1.98/api/getAforoDeterminado", {
        fecha: fecha.current.value,
        seccion: idSeccion.current.value,
        hora: hora.current.value,
      })
      .then(function (response) {
        setAforoHoraDeterminada(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function obtenerMaximosDia() {
    axios
      .post("http://192.168.1.98/api/getMaximosDia", {
        fecha: fecha.current.value,
      })
      .then(function (response) {
        let a = [];
        response.data.forEach((dato) => {
          a.push(dato);
        });
        console.log(response);
        setMaximosDia(a);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function obtenerMaximosDiaSeccion() {
    axios
      .post("http://192.168.1.98/api/getMaximoDiaSeccion", {
        fecha: fecha.current.value,
        seccion: idSeccion.current.value,
      })
      .then(function (response) {
        let a = [];
        response.data.forEach((dato) => {
          a.push(dato);
        });

        setMaximosDiaSeccion(a);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function obtenerMaximosSeccion() {
    axios
      .post("http://192.168.1.98/api/getMaximosSeccion", {
        fecha: fecha.current.value,
        seccion: idSeccion.current.value,
      })
      .then(function (response) {
        let a = [];
        response.data.forEach((dato) => {
          a.push(dato);
        });

        console.log(response);
        setMaximosSeccion(a);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Contenedor visible={props.visible}>
      <div>
        <p>
          Seleccionar Fecha <input type="date" ref={fecha}></input>
        </p>
        <p>
          Seleccionar Sección <input type="number" ref={idSeccion}></input>
        </p>
        <p>
          Seleccionar Hora <input type="time" ref={hora}></input>
        </p>
      </div>
      <ContenedorGrid>
        <ContenedorSeccion>
          {" "}
          <div>
            <p>
              Media de Aforo Secciones de un día en concreto
              <button onClick={obtenerMediaSeccionesDia}>Cargar</button>
            </p>
          </div>
          <ResponsiveContainer>
            <BarChart data={seccionesDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="seccion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="media" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ContenedorSeccion>

        <ContenedorSeccion>
          {" "}
          <div>
            <p>
              Media de Aforo Secciones de un día y sección en concreto
              <button onClick={obtenerMediaSeccion}>Cargar</button>
            </p>
          </div>
          <ResponsiveContainer>
            <BarChart data={seccionDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="seccion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="media" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ContenedorSeccion>

        <ContenedorSeccion>
          {" "}
          <div>
            <p>
              Seleccionar Fecha,ID seccion y Hora para saber el aforo a un
              determinado día y hora{" "}
              <button onClick={obtenerAforoDeterminado}>Cargar</button>
            </p>
          </div>
          <div>
            <p>Aforo de la sección : {aforoHoraDeterminada.seccion}</p>
            <p>Día y hora : {aforoHoraDeterminada.created_at}</p>
            <p>Aforo : {aforoHoraDeterminada.aforo}</p>
          </div>
        </ContenedorSeccion>
        <ContenedorSeccion>
          <div>
            <p>
              Media de Aforo Secciones de un día en concreto
              <button onClick={obtenerMaximosDia}>Cargar</button>
            </p>
          </div>
          <ResponsiveContainer>
            <BarChart data={maximosDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="seccion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aforoMaximo" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ContenedorSeccion>
        <ContenedorSeccion>
          {" "}
          <div>
            <p>
              Maximos de Aforo de un día y sección en concreto
              <button onClick={obtenerMaximosDiaSeccion}>Cargar</button>
            </p>
          </div>
          <ResponsiveContainer>
            <BarChart data={maximosDiaSeccion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="seccion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aforoMaximo" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ContenedorSeccion>
        <ContenedorSeccion>
          {" "}
          <div>
            <p>
              Aforos Máximos de una sección
              <button onClick={obtenerMaximosSeccion}>Cargar</button>
            </p>
          </div>
          <ResponsiveContainer>
            <BarChart data={maximosSeccion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="seccion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aforoMaximo" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ContenedorSeccion>
      </ContenedorGrid>
    </Contenedor>
  );
}

export default SeccionAnalisis;
