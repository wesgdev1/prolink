import { Badge } from "react-bootstrap";
import { ContainerBlog } from "../components/blog/StyledComponentsBlog";

import { BlogCard } from "../components/blog/BlogCard";
import { EditBlog } from "../components/profile/StyledComponentsProfile";
import { useBlogs } from "../domain/useBlogs";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
  const { data, loading, error } = useBlogs();
  const navigate = useNavigate();

  const viewDetail = (id) => {
    navigate(`/blogs/${id}`);
  };
  return (
    <ContainerBlog>
      <div className="d-flex flex-column align-items-center gap-2">
        <h1>Blog prolink</h1>
        <p>haga clic en una etiqueta para explorar la publicación por tema</p>
        <div className="d-flex gap-4">
          <EditBlog>
            <Badge bg="secondary">All</Badge>
          </EditBlog>
          <EditBlog>
            <Badge bg="secondary">Software</Badge>
          </EditBlog>
          <EditBlog>
            <Badge bg="secondary">Cloud</Badge>
          </EditBlog>
          <EditBlog>
            <Badge bg="secondary">Network</Badge>
          </EditBlog>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-5 justify-content-center pt-5 pb-5">
        {loading && <h1>Cargando...</h1>}
        {error && <h1>Error...</h1>}
        {data?.length > 0 &&
          data.map((blog) => {
            return (
              <BlogCard key={blog.id} blog={blog} viewDetail={viewDetail} />
            );
          })}
        {data?.length === 0 && <h1>No hay blogs para mostrar</h1>}
      </div>
    </ContainerBlog>
  );
};
