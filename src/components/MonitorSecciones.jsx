import { useLocation } from "react-router-dom";

function MonitorSecciones(props) {
  const loc = useLocation();
  function amigo() {
    return <p>{loc.pathname}</p>;
  }

  return (
    <div>
      <h1>Monitor Secciones</h1>

      {amigo()}
    </div>
  );
}

export default MonitorSecciones;
