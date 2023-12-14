import { useState } from "react";
import { Pings } from "./Pings";
import { ButtonProfile } from "./StyledComponentsProfile";
import { addIp, removeIp } from "../../../src/store/pingReducers";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export const PingsTable = () => {
  const [ipvalue, setIpValue] = useState("");
  const dispatch = useDispatch();
  const ips = useSelector((state) => state.pings.ips);
  const isValidIP = (ip) => {
    const ipRegex = /^(\d{1,3}\.){3}(\d{1,3})$/;
    return ipRegex.test(ip);
  };

  const addIpFormKeyPress = (e) => {
    if (e.key === "Enter") {
      addIpForm(event);
    }
  };

  const addIpForm = (e) => {
    e.preventDefault();

    if (isValidIP(ipvalue)) {
      setIpValue("");
      dispatch(addIp({ ip: ipvalue, result: 0 }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese una ip valida | Ej: 181.204.214.203",
      });
    }
  };
  return (
    <div className="pt-5">
      <h4>
        <i className="bi bi-ethernet"></i> Lista de Hosts
      </h4>
      <hr />

      <form className="d-flex gap-3 pt-5 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese una ip valida | Ej:181.204.214.203"
          value={ipvalue}
          onChange={(e) => setIpValue(e.target.value)}
          onKeyPress={addIpFormKeyPress}
        />
        <ButtonProfile
          onClick={() => addIpForm(event)}
          className="btn btn-primary"
        >
          Agregar
        </ButtonProfile>
      </form>
      <div className="d-flex gap-4 flex-wrap justify-content-center pt-5 ">
        {ips.map((ip) => (
          <Pings ip={ip.ip} key={ip.ip} />
        ))}
      </div>
    </div>
  );
};
