import { Col, Container, Row, Button, Badge } from "react-bootstrap";
import "./SideBar.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { userIsLoggedIn } from "../database/firebase";

const profileInfo = {
  name: "DianaPrincess",
  bio: "Queen of world 👑 Sassy 18 😇 Miss me on 9/8 🎂 Friendly girl 💃 Single and Young 👸",
  tags: ["young", "cute", "fashion"],
};

const postInfo = {
  creationDate: "Sunday September 13 - 02:00",
};

function SideBarSecondary() {
  const [signInStatus, setSignInStatus] = useState(userIsLoggedIn());

  return (
    <div id="side-bar-secondary-main">
      <Container>
        <Row>
          <Col>
            <p>{postInfo.creationDate}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Sunday Morning Photoshoot</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {profileInfo.tags.map((tag) => (
              <Badge className="tag-badges" key={tag + " tag"} bg="secondary">
                {tag}
              </Badge>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{profileInfo.bio}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SideBarSecondary;
