import { Pings } from "./Pings";

export const PingsTable = () => {
  return (
    <div className="pt-5">
      <h3>
        <i className="bi bi-ethernet"></i> Lista de Hosts
      </h3>
      <div className="d-flex gap-4 flex-wrap justify-content-center pt-5 ">
        <Pings ip={"8.8.8.8"} />
        <Pings ip={"1.1.1.1"} />
        <Pings ip={"181.127.149.51"} />
      </div>
    </div>
  );
};
