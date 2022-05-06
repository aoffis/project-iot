import { useRef, useState } from "react";
import firebaseConfig from "../config";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

const SignUp = () => {
  const [error, setError] = useState("");
  const [passwordText, setPasswordText] = useState();
  const [emailText, setEmailText] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        );
      navigate("/");
      console.log(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ display: "flex", height: "80vh" }}>
        <Box
          sx={{
            width: "345px",
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
            Sign Up
          </Typography>
          <Typography sx={{ mt: "10px" }} component="div" variant="body1">
            สมัครสมาชิก
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
              onClick={handleSignUp}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
