import "./SideNavbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { saveUserData, signInUser, verifyUser } from "../database/firebase";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt from "jwt-decode";
import { getAuth, signInWithCredential } from "firebase/auth";

function SideNavbar() {
  const [signInStatus, setSignInStatus] = useState("");

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {signInStatus === "" ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // signInUser(credentialResponse);
              const jwtData = jwt(credentialResponse.credential);
              setSignInStatus(jwtData.name);
              saveUserData(jwtData);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        ) : (
          <p>{signInStatus}</p>
        )}

        <Navbar.Brand href="#home">IGNITIA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Browse</Nav.Link>
            <Nav.Link href="#link">Upload</Nav.Link>
            <Nav.Link href="#link">My Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SideNavbar;
