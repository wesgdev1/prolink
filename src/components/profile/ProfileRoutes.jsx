import { Navigate, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import { Blogs } from "./Blogs";
import { BlogsForm } from "./BlogsForm";
import { FacturasForm } from "./FacturasForm";

export const ProfilesRoutes = () => {
  // const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/add" element={<BlogsForm />} />
        <Route path="blogs/:id" element={<BlogsForm />} />
        <Route path="facturas" element={<FacturasForm />} />
      </Routes>
    </>
  );
};
