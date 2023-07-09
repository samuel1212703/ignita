import { Col, Container, Row, Button } from "react-bootstrap";
import "./SideBar.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonPinCircleSharpIcon from "@mui/icons-material/PersonPinCircleSharp";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import {
  subscribeToUser,
  checkIfSubscribed,
  userIsLoggedIn,
} from "../database/firebase";
import { useEffect, useState } from "react";

const profileInfo = {
  name: "DianaPrincess",
  email: "dianaprincess@gmail.com",
  bio: "Queen of world 👑 Sassy 18 😇 Miss me on 9/8 🎂 Friendly girl 💃 Single and Young 👸",
  tags: ["young", "cute", "fashion"],
  uid: "JyWg0fDmJ16TZ0AO1h05",
};

const postInfo = {
  creationDate: "Sunday September 13 - 02:00",
};

function SideBar() {
  const [following, setFollowing] = useState(
    checkIfSubscribed(profileInfo.email)
  );
  function handleFollow() {
    subscribeToUser(profileInfo.email);
    setFollowing(1);
  }

  return (
    <div id="side-bar-main">
      <Container>
        <Row>
          <Col>
            <img
              src="/images/profile-picture.png"
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
                  <Col onClick={handleFollow}>
                    {following ? (
                      <div>
                        Following
                        <PersonPinCircleSharpIcon />
                      </div>
                    ) : (
                      <div>
                        Follow
                        <PersonPinCircleOutlinedIcon />
                      </div>
                    )}
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
