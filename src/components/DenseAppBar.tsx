import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import BasicMenu from "./BasicMenu";
import { grey, teal } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export default function DenseAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.href = '/';
};

  useEffect(() => {
    // const storedUsername = localStorage.getItem("username");
    // if (storedUsername) {
    //   setUsername(storedUsername);
    //   setIsLoggedIn(true);
    // }
    const storedUsername = localStorage.getItem("username");
    const storedAccessToken = localStorage.getItem("access_token");

    if (storedUsername && storedAccessToken) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    } else {
      setUsername("");
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, width: 0.7, margin: "auto" }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          color: grey[800],
          borderRadius: 1,
        }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          {" "}
          {/* Align items to the ends */}
          <Box display="flex" alignItems="center">
            {" "}
            {/* Wrap home icon and menu button */}
            <Tooltip title="Home">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="home"
                href="/"
                sx={{
                  mr: 3,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                    color: teal[200],
                  },
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="forms"
              sx={{
                mr: 3,
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent",
                  color: teal[200],
                },
              }}
            >
              <BasicMenu />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            {" "}
            {/* Flex container for spacing between elements */}
            <Tooltip title="Register">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="register"
                href="/register"
                sx={{
                  mr: 3,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                    color: teal[200],
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "capitalize",
                    "&.MuiButton-root:hover": {
                      bgcolor: "transparent",
                      color: teal[200],
                    },
                  }}
                >
                  Register
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Login">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="login"
                href="/login"
                sx={{
                  mr: 3,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                    color: teal[200],
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "capitalize",
                    "&.MuiButton-root:hover": {
                      bgcolor: "transparent",
                      color: teal[200],
                    },
                  }}
                >
                  Login
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="logout"
                href="/login"
                sx={{
                  mr: 3,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                    color: teal[200],
                  },
                }}
                onClick={handleLogout}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "capitalize",
                    "&.MuiButton-root:hover": {
                      bgcolor: "transparent",
                      color: teal[200],
                    },
                  }}
                >
                  Logout
                </Typography>
              </IconButton>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" sx={{ marginLeft: "auto" }}>
            {" "}
            {/* Push login status to the right */}
            <Tooltip
              title={isLoggedIn ? `Logged in as ${username}` : "Not logged in"}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "capitalize",
                  "&.MuiButton-root:hover": {
                    bgcolor: "transparent",
                    color: teal[200],
                  },
                }}
              >
                {isLoggedIn ? `Logged in as ${username}` : "Not logged in"}
              </Typography>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
