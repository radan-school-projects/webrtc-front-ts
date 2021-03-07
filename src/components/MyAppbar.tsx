import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  // IconButton,
  Link,
  Typography,
  Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 90,
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    title: {
      flexGrow: 1,
    },
  }),
);

const MyAppBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit" aria-label="menu" >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            className={classes.title}
          >
            <Link
              component={RouterLink}
              to="/"
              sx={{ "color": "#fff", ":hover": { textDecoration: "none" } }}
            >
              React App
            </Link>
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
          >
            {/* <Link to="/login">Login</Link> */}
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
