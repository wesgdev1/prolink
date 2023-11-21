import { tr } from "date-fns/locale";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";

export const BlogTable = ({ blogs }) => {
  const [blogsBypage, setBlogsByPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const totalBlogs = blogs.length;
  const lastIndex = currentPage * blogsBypage;
  const firstIndex = lastIndex - blogsBypage;
  const navigate = useNavigate();

  const editBlog = (blog) => {
    navigate(`/profile/blogs/${blog.id}`, { state: { blog } });
  };
  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha de Creacion</th>
            <th>Titulo</th>
            <th>Visible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .map((blog) => (
              <tr key={blog.id}>
                <td>{blog.createdAt}</td>
                <td>{blog.title}</td>
                <td>{blog.published ? "Publicado" : "No publicado"}</td>
                <td>
                  <EditBlog onClick={() => editBlog(blog)}>
                    <i className="bi bi-pencil-square"></i>
                  </EditBlog>
                  <EditBlog>
                    <i className="bi bi-toggle2-on"></i>
                  </EditBlog>
                  <EditBlog>
                    <i className="bi bi-eye-fill"></i>
                  </EditBlog>
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
