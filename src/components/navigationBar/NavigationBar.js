import {
  AppBar,
  Stack,
  Typography,
  Toolbar,
  Button,
  Menu,
  IconButton,
  Avatar,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeAuthToken } from "../../util/auth";
import { getAuth } from "firebase/auth";
import profilePic from "../../values/pictures/profilePicture.png";
import { useMediaQuery } from "@mui/material";
const pages = ["Dashboard", "MyTasks", "Tasks"];

const NavigationBar = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 390px)");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleLogout = () => {
    getAuth()
      .signOut()
      .then((res) => {
        removeAuthToken();
        // removeUserData();
        navigate("/");
      })
      .catch((err) => {
        //there shouldn't every be an error from firebase but just in case
        console.log(err);
      });
  };
  const logoClickHandler = () => {
    navigate("/");
  };
  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar>
        {!isTabletOrMobile ? (
          <Typography
            variant="h6"
            component="h1"
            onClick={logoClickHandler}
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            TASK MANAGER
          </Typography>
        ) : null}

        <Stack direction="row" spacing={2}>
          {pages.map((page) => (
            <Button key={page}>
              <Link
                to={`/${page}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                {page}
              </Link>
            </Button>
          ))}
          <div>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar src={profilePic} alt="Profile" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleProfile}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default NavigationBar;
