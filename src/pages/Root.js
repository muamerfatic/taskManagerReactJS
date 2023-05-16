import logo from "../logo.svg";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationModal from "../components/registration/RegistrationModal";
import LoginModal from "../components/login/LoginModal";
import { getAuthToken } from "../util/auth";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

const Root = () => {
  const navigate = useNavigate();

  const [showRegModal, setShowRegModal] = useState(false);
  const closeRegModal = () => {
    setShowRegModal(false);
  };
  const openRegModal = () => {
    setShowRegModal(true);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  useEffect(() => {
    if (getAuthToken()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Container sx={{ textAlign: "center", margin: "auto" }}>
      <Typography variant="h2" color={"#333333"}>
        Welcome to TaskManager
      </Typography>
      <img src={logo} className="App-logo" alt="logo" />
      <Container
        sx={{
          padding: "2.5% ",
          borderRadius: "30px",
          backgroundColor: "#9f4298",
          border: "3px solid #CFDB31",
          color: "#d1afd3",
        }}
      >
        <Typography variant="h6">
          Ever felt like you are full of responsibilities and you won't get to
          "mark them as checked".
        </Typography>
        <Typography variant="h6">
          Well we are here to help you organize time and manage your tasks.
        </Typography>
      </Container>
      <Button
        color="lightGray"
        variant="contained"
        onClick={openRegModal}
        size="large"
        sx={{
          backgroundColor: "#9F4298",
          fontWeight: "bolder",
          borderRadius: "12px",
          border: "3px solid #CFDB31",
          margin: "1rem",
          padding: "1rem",
          "&:hover": {
            backgroundColor: "green",
            border: "3px solid #9F4298",
          },
        }}
      >
        Get started!
      </Button>
      {showRegModal ? (
        <RegistrationModal
          showThisRegModal={showRegModal}
          closeThisRegModal={closeRegModal}
          closeModalOnSubmit={closeRegModal}
        />
      ) : null}
      <Box>
        Already in?
        <Button
          size="large"
          variant="text"
          onClick={openLoginModal}
          sx={{ fontWeight: "bolder" }}
        >
          Login
        </Button>
        {showLoginModal ? (
          <LoginModal
            showThisLoginModal={showLoginModal}
            closeThisLoginModal={closeLoginModal}
            closeModalOnSubmit={closeLoginModal}
          />
        ) : null}
      </Box>
    </Container>
  );
};
export default Root;
