import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleClick = () => {
    navigate("/profile/blogs/add");
  };

  async function cargarBlogs() {
    const response = await fetch("http://localhost:3000/api/v1/blogs");
    const data = await response.json();
    setData(data.data);
  }

  useEffect(() => {
    cargarBlogs();
  }, []);

  return (
    <div>
      {data.map((blog) => {
        return (
          <div key={blog.id}>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
        );
      })}
      <Button onClick={handleClick}>Crear Blog</Button>
    </div>
  );
};
