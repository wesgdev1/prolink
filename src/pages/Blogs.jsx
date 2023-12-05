import { Badge, Spinner } from "react-bootstrap";
import { ContainerBlog } from "../components/blog/StyledComponentsBlog";

import { BlogCard } from "../components/blog/BlogCard";
import { EditBlog } from "../components/profile/StyledComponentsProfile";
import { useBlogs } from "../domain/useBlogs";
import { useNavigate } from "react-router-dom";
import { Fade, Flip } from "react-awesome-reveal";

export const Blogs = () => {
  const { data, loading, error } = useBlogs();
  const navigate = useNavigate();

  const viewDetail = (id) => {
    navigate(`/blogs/${id}`);
  };
  return (
    <ContainerBlog>
      <div className="d-flex flex-column align-items-center gap-2 pt-5">
        <Fade>
          <h1>Blog prolink</h1>
        </Fade>
        <p className="pt-5">
          haga clic en una etiqueta para explorar la publicación por tema
        </p>

        <div className="d-flex gap-4 pb-4">
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
      <hr />

      {loading && <Spinner animation="border" variant="info" />}
      {error && <h1>Error...</h1>}
      {data && (
        <Flip>
          <div className="d-flex flex-wrap gap-5 justify-content-center pt-5 pb-5">
            {data?.length > 0 &&
              data.map((blog) => {
                if (blog.published === false) {
                  return null;
                } else
                  return (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      viewDetail={viewDetail}
                    />
                  );
              })}
          </div>
        </Flip>
      )}
    </ContainerBlog>
  );
};
