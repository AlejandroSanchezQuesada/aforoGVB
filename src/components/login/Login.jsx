import styled from "styled-components";
import axios from "axios";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const Contenedor = styled.div`
  font-family: "ataper";
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20% 40% 40%;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: #e5f1fb;
  text-align: center;
`;

const ContenedorLogin = styled.form`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 10% 10%;
`;

const TituloLogin = styled.div`
  font-size: 6vw;
`;

const BotonLogin = styled.button`
  color: white;
  border: solid 1px white;
  border-radius: 5px;
  background-color: #1e1e1e;
  width: 20vw;
  padding: 1%;
  margin-top: 20px;
  @media (max-width: 600px) {
    padding: 2%;
    width: 60vw;
  }
`;

const DivCentrarBoton = styled.div`
  text-align: center;
`;

const ContenedorInput = styled.div``;

const InputEstilos = styled.input`
  height: 5vh;
  width: 20vw;
  border-radius: 5px;
  border: solid 1px #1e1e1e;
  @media (max-width: 600px) {
    width: 60vw;
  }
`;

function Login() {
  /* States */
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  function logearse() {
    console.log(email.current.value);
    console.log(password.current.value);
    axios
      .post("http://apiaforo.test/api/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then(function (response) {
        localStorage.setItem("token", "Bearer" + response.data.token);
        logeado();
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  }

  function logeado() {
    history.push("/panel");
  }
  return (
    <Contenedor>
      <TituloLogin>Inicia sesión para administrar el aforo</TituloLogin>
      <ContenedorLogin onSubmit={logearse} action="#">
        <ContenedorInput>
          <InputEstilos
            ref={email}
            type="email"
            placeholder="email"
          ></InputEstilos>
        </ContenedorInput>
        <br></br>
        <ContenedorInput>
          <InputEstilos
            ref={password}
            type="password"
            placeholder="contraseña"
          ></InputEstilos>
        </ContenedorInput>

        <DivCentrarBoton>
          <BotonLogin type="submit">Iniciar Sesión</BotonLogin>
        </DivCentrarBoton>
      </ContenedorLogin>
      <p>
        ¿No tienes cuenta? Ponte en contacto con un administrador para la
        creación de una
      </p>
    </Contenedor>
  );
}

export default Login;
