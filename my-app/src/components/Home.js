import React, { useContext } from "react";
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { AuthContext } from "./Auth";
import { GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../config";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  // const googleLogin = (e) => {
  //   firebaseConfig
  //     .auth()
  //     .signInWithPopup(provider)
  //     .catch((error) => {
  //       console.table(error);
  //     });
  //   //console.log(auth);
  // };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {currentUser ? (
          <Navigate to="/dashboard" />
        ) : (
          <AppBar
            position="static"
            sx={{
              bgcolor: "white",
              paddingLeft: "10vw",
              paddingRight: "10vw",
              height: "5vh",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "black" }}
              >
                IOT
              </Typography>
              <Button
                sx={{ margin: "1vw", width: "115px" }}
                variant="outlined"
                component={Link}
                to="/signup"
              >
                Sign up
              </Button>
              <Button
                sx={{ width: "115px" }}
                variant="contained"
                component={Link}
                to="/login"
              >
                Sign in
              </Button>
            </Toolbar>
          </AppBar>
        )}
      </Box>
    </>
  );
};

export default Home;
