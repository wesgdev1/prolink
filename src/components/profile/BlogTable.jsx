import { tr } from "date-fns/locale";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import Swal from "sweetalert2";
import { updateBlog } from "../../api/blogs";

export const BlogTable = ({ blogs }) => {
  const { user } = useContext(AuthContext);
  const [blogsBypage, setBlogsByPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const totalBlogs = blogs.length;
  const lastIndex = currentPage * blogsBypage;
  const firstIndex = lastIndex - blogsBypage;
  const navigate = useNavigate();
  const [dataBlog, setDataBlog] = useState([...blogs]);

  const editBlog = (blog) => {
    navigate(`/profile/blogs/${blog.id}`, { state: { blog } });
  };

  const viewBlog = (blog) => {
    navigate(`/blogs/${blog.id}`);
  };

  const activarBlog = (blog) => {
    Swal.fire({
      title: "Esta accion publicara el blog, estas seguro?",
      text: "¡Podras revertilo cuando quieras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Activar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateBlog(blog.id, {
          published: true,
        });

        if (response) {
          Swal.fire("Publicado!", "El blog ha sido publicado.", "success");

          const index = dataBlog.findIndex((item) => item.id === blog.id);
          const newData = [...dataBlog];
          newData[index].published = true;
          setDataBlog(newData);
        }
      }
    });
  };

  const inactivarBlog = (blog) => {
    Swal.fire({
      title: "Esta accion hara que el blog no sea visible, estas seguro?",
      text: "¡Podras revertilo cuando quieras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Inactivar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateBlog(blog.id, {
          published: false,
        });

        if (response) {
          Swal.fire("Inactivado!", "El blog ha sido inactivado.", "success");

          const index = dataBlog.findIndex((item) => item.id === blog.id);
          const newData = [...dataBlog];
          newData[index].published = false;
          setDataBlog(newData);
        }
      }
    });
  };
  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Fecha de Creación</th>
            {user.tipoUsuario === "Admin" && <th>Autór</th>}
            <th>Título</th>
            <th>Visible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dataBlog
            .map((blog) => (
              <tr key={blog.id}>
                <td> {format(parseISO(blog.createdAt), "dd/MM/yyyy")}</td>
                {user.tipoUsuario === "Admin" && (
                  <td>{blog.tecnico?.nombreCompleto}</td>
                )}
                <td>{blog.title}</td>
                <td>{blog.published ? "Publicado" : "No publicado"}</td>
                <td>
                  {user.tipoUsuario === "Tecnico" ? (
                    <>
                      {" "}
                      <EditBlog onClick={() => editBlog(blog)}>
                        <i className="bi bi-pencil-square"></i>
                      </EditBlog>
                      <EditBlog onClick={() => viewBlog(blog)}>
                        <i className="bi bi-eye-fill"></i>
                      </EditBlog>
                    </>
                  ) : (
                    <>
                      {blog.published ? (
                        <EditBlog onClick={() => inactivarBlog(blog)}>
                          <i className="bi bi-toggle2-on"></i>
                        </EditBlog>
                      ) : (
                        <EditBlog onClick={() => activarBlog(blog)}>
                          <i className="bi bi-toggle2-off"></i>
                        </EditBlog>
                      )}

                      <EditBlog onClick={() => viewBlog(blog)}>
                        <i className="bi bi-eye-fill"></i>
                      </EditBlog>
                    </>
                  )}
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Blogs: {blogs.length}</td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={blogsBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalBlogs}
      />
    </div>
  );
};
