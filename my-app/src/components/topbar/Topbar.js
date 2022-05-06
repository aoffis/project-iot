import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import firebaseConfig from "../../config";

function Topbar(props) {
  //console.table(props.currentUser.displayName);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "",
          height: "59px",
          zIndex: 2,
          position: "sticky",
          top: 0,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              color: "whitesmoke",
              textTransform: "uppercase",
            }}
          >
            Automatic Watering System
          </Typography>
          <Tooltip title={props.currentUser.email}>
            <IconButton
              sx={{
                p: 0,
                marginRight: "1vw",
                ":hover": { boxShadow: 6, transition: "0.3s" },
                transition: "0.3s",
              }}
            >
              <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="error"
            onClick={() => firebaseConfig.auth().signOut()}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Topbar;
