import React from "react";
import { useRef, useState, useContext } from "react";
import firebaseConfig from "../config";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

function Login() {
  const [passwordText, setPasswordText] = useState();
  const [emailText, setEmailText] = useState();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        );

      console.log(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Container maxWidth="sm" sx={{ display: "flex", height: "80vh" }}>
        <Box
          sx={{
            width: "315px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #bdbdbd",
            padding: "5%",
            borderRadius: "9px",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Typography sx={{ mt: "10px" }} component="div" variant="body1">
            เข้าสู่ระบบ
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => {
                setEmailText(e.target.value);
              }}
              error={emailText === ""}
              helperText={emailText === "" ? "Email cannot be empty." : " "}
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              onChange={(e) => {
                setPasswordText(e.target.value);
              }}
              error={passwordText === ""}
              helperText={
                passwordText === "" ? "Password cannot be empty." : " "
              }
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            {error ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>{error}</FormHelperText>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick}
              sx={{ mt: 1, mb: 1 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
