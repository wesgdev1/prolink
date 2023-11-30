import { Navigate, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import { Blogs } from "./Blogs";
import { BlogsForm } from "./BlogsForm";
import { FacturasForm } from "./FacturasForm";
import { Tecnicos } from "./Tecnicos";
import { TecnicosForm } from "./TecnicosForm";
import { Clientes } from "./Clientes";
import { ClientesForm } from "./ClientesForm";
import { AuthContext } from "../../auth/context/AuthContext";
import { Information } from "./Information";
import { SoporteForm } from "./SoporteForm";
import { Soportes } from "./Soportes";
import { SoporteDetail } from "./SoporteDetail";
import { SoportesHistory } from "./SoportesHistory";
import { TestComponent } from "./TestComponent";
import { Facturas } from "./Facturas";

export const ProfilesRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user?.tipoUsuario === "Admin" ? (
              <Information />
            ) : user?.tipoUsuario === "Cliente" ? (
              <>
                <TestComponent />
              </>
            ) : (
              <></>
            )
          }
        />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/add" element={<BlogsForm />} />
        <Route path="blogs/:id" element={<BlogsForm />} />
        <Route path="facturas" element={<FacturasForm />} />
        <Route path="tecnicos/" element={<Tecnicos />} />
        <Route path="tecnicos/add" element={<TecnicosForm />} />
        <Route path="tecnicos/:id" element={<TecnicosForm />} />
        <Route path="clientes/" element={<Clientes />} />
        <Route path="clientes/add" element={<ClientesForm />} />
        <Route path="clientes/:id" element={<ClientesForm />} />
        <Route path="clientes/:id/soportes" element={<SoportesHistory />} />
        <Route path="tecnicos/:id/soportes" element={<SoportesHistory />} />
        <Route path="ticket/add" element={<SoporteForm />} />
        <Route path="soportes" element={<Soportes />} />
        <Route path="soportes/mis-soportes" element={<Soportes />} />
        <Route path="soportes/:id" element={<SoporteDetail />} />
        <Route path="misFacturas" element={<Facturas />} />
      </Routes>
    </>
  );
};
