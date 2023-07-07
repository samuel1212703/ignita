import { Col, Container, Row, Button } from "react-bootstrap";
import "./SideBar.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { subscribeToUser } from "../database/firebase";

const profileInfo = {
  name: "DianaPrincess",
  bio: "Queen of world 👑 Sassy 18 😇 Miss me on 9/8 🎂 Friendly girl 💃 Single and Young 👸",
  tags: ["young", "cute", "fashion"],
  userId: "JyWg0fDmJ16TZ0AO1h05",
};

const postInfo = {
  creationDate: "Sunday September 13 - 02:00",
};

function SideBar() {
  return (
    <div id="side-bar-main">
      <Container>
        <Row>
          <Col>
            <img
              src="/ignitia/images/profile-picture.png"
              alt="The posters profile picture"
              id="profile-picture"
            ></img>
          </Col>
          <Col>
            <h1>{profileInfo.name}</h1>
          </Col>
          <Col>
            <FavoriteBorderIcon />
            <ChatBubbleOutlineIcon />
            <Button>
              <Container>
                <Row>
                  <Col onClick={() => subscribeToUser(profileInfo.userId)}>
                    Follow
                    <PersonPinIcon />
                  </Col>
                </Row>
              </Container>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SideBar;
