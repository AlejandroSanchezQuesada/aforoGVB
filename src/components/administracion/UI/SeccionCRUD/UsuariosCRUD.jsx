import styled from "styled-components";
import axios from "axios";
import { useRef } from "react";

const Contenedor = styled.div`
  display: ${(props) => props.visible};
  height: 100%;
  background-color: #c7d2fe;
`;

const BarraOpciones = styled.div`
  width: 100%;
  height: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #1e293b;
  text-align: right;
`;

const ContenedorFormularioRegistro = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80%);
  grid-template-rows: repeat(auto-fill, 40px);
  height: 100vh;

  padding-top: 2%;
  margin-left: 15%;
`;

const Input = styled.input`
  height: 25px;
`;

const Select = styled.select`
  height: 25px;
`;

const Button = styled.button`
  border: solid 1px #82e569;
  background-color: #82e569;
  border-radius: 5px;

  &:hover {
    transition: 0.3s;
    background-color: #5fa84d;
  }
`;

function UsuariosCRUD(props) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const password_confirmation = useRef("");
  const rango = useRef("");

  function registrarUsuario() {
    axios
      .post("http://192.168.1.98/api/registrarse", {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        password_confirmation: password_confirmation.current.value,
        rango: rango.current.value,
      })
      .then(function (response) {
        console.log(response);

        alert(response.statusText);

        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
        password_confirmation.current.value = "";
        rango.current.value = "";
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  return (
    <Contenedor visible={props.visible}>
      <BarraOpciones></BarraOpciones>
      <ContenedorFormularioRegistro>
        <Input ref={name} placeholder="Nombre *" type="text"></Input>
        <Input ref={email} placeholder="Email *" type="email"></Input>
        <Input
          ref={password}
          placeholder="Contraseña *"
          type="password"
          minLength={7}
        ></Input>
        <Input
          ref={password_confirmation}
          placeholder="Confirmar Contraseña *"
          type="password"
          minLength={7}
        ></Input>

        <Select ref={rango}>
          <option value="">Rango de Usuario:</option>
          <option value="">Staff</option>
          <option value="admin">Admin</option>
        </Select>

        <Button onClick={registrarUsuario}>Registrar Usuario</Button>
      </ContenedorFormularioRegistro>
    </Contenedor>
  );
}

export default UsuariosCRUD;
