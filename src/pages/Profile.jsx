import { Card } from "react-bootstrap";
import { NavProfiles } from "../components/profile/NavProfiles";
import { ProfilesRoutes } from "../components/profile/ProfileRoutes";
import { ContainerProfile } from "../components/profile/StyledComponentsProfile";

export const Profile = () => {
  return (
    <ContainerProfile>
      <div className="mx-2  px-5  pb-3">
        <Card className="text-center">
          <Card.Header>Welinton Elvis Suarez</Card.Header>
          <Card.Body>
            <img
              src="https://res.cloudinary.com/db9nfgjqr/image/upload/v1698682734/profile_photos/5fcface9878aec0e33527143428d06e0.jpg"
              alt=""
              style={{ width: "10%", borderRadius: "50%" }}
            />
            <div className="d-flex justify-content-between">
              <Card.Text>Email: willienn@hotmail.com</Card.Text>
              <Card.Text>Cargo: sistemas</Card.Text>
              <Card.Text>Numero: 3213718930</Card.Text>
            </div>

            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
          <Card.Footer className="text-muted">
            Ultima Conexion: hace un momento
          </Card.Footer>
        </Card>
      </div>
      <div className="d-flex mx-2  px-5 pb-5 ">
        <div className="">
          <NavProfiles />
        </div>
        <ProfilesRoutes />
      </div>
    </ContainerProfile>
  );
};
