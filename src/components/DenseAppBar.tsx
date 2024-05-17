import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from './BasicMenu';
import { grey, teal } from '@mui/material/colors';
import Typography from '@mui/material/Typography';


export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1, width: .7, margin: 'auto' }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          color: grey[800],
          borderRadius: 1
        }}
      >
        <Toolbar variant="dense" >

          <Tooltip title="Home">
            <IconButton edge="start" color="inherit" aria-label="home" href="/"
              sx={{
                mr: 3,
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent",
                  color: teal[200]
                }
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <IconButton edge="start" color="inherit" aria-label="forms"
            sx={{
              mr: 3,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
                color: teal[200]
              }
            }}
          >
            <BasicMenu />
          </IconButton>

          <Tooltip title="Register">
            <IconButton edge="start" color="inherit" aria-label="register" href="/register"
              sx={{
                mr: 3,
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent",
                  color: teal[200]
                }
              }}
            >
              <Typography variant="h6" component="div" sx={{
                    textTransform: "capitalize", 
                    "& .MuiButton-root:hover": {
                        bgcolor: "transparent",
                        color: teal[200]
                    }
                }}>
                    Register
                </Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title="Login">
            <IconButton edge="start" color="inherit" aria-label="register" href="/login"
              sx={{
                mr: 3,
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent",
                  color: teal[200]
                }
              }}
            >
              <Typography variant="h6" component="div" sx={{
                    textTransform: "capitalize", 
                    "& .MuiButton-root:hover": {
                        bgcolor: "transparent",
                        color: teal[200]
                    }
                }}>
                    Login
                </Typography>
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
    </Box>
  );
}