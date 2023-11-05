import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { BlogDeatil } from "../pages/BlogDeatil";
import { Blogs } from "../pages/Blogs";
import { Profile } from "../pages/Profile";
import { NavComponent } from "../components/NavComponent";
import { Footer } from "../components/footer/Footer";

export const ProlinkRoutes = () => {
  return (
    <>
      <NavComponent />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDeatil />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
