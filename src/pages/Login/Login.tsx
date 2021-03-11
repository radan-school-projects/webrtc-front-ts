import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, useHistory } from "react-router-dom";
import MessageAlert from "./MessageAlert";
import { appApiAxios } from "../../config/axios";

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const [userCredentials, setUserCredentials] =
    useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] =
    useState<string[]>([]);
  const history = useHistory();

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = userCredentials;
      const res = await appApiAxios.post("/auth/login", { email, password });

      if (res.data.content.token) {
        history.push("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        // ?
        setErrorMessage(err.response.data.message);
      } else {
        throw err;
      }
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <MessageAlert
          message={errorMessage}
          severity="error"
        />
        <Box
          component="form"
          noValidate
          sx={{
            width: "100%", // Fix IE11 issue.
            mt: 1,
          }}
          onSubmit={handleLogin}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/register"
              >
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
