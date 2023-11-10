import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { BlogDeatil } from "../pages/BlogDeatil";
import { Blogs } from "../pages/Blogs";
import { Profile } from "../pages/Profile";
import { NavComponent } from "../components/NavComponent";
import { Footer } from "../components/footer/Footer";
import { Facturas } from "../pages/Facturas";
import { PagoExitoso } from "../pages/PagoExitoso";

export const ProlinkRoutes = () => {
  return (
    <>
      <NavComponent />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/blogs/:id" element={<BlogDeatil />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/success" element={<PagoExitoso />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
