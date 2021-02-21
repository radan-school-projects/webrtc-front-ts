import React from "react";
import { Button, Paper } from "@material-ui/core";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import unicornImage
  from "../assets/images/meritt-thomas-KTYjVDmN4A4-unsplash.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      color: theme.palette.primary.contrastText,
    },
    paper1: {
      backgroundImage: `url(${unicornImage})`,
      backgroundBlendMode: "multiply",
      backgroundColor: "#999999",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      color: "inherit",
    },
    root2: {
      padding: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(1.5),
    },
    typo1: {
      marginBottom: theme.spacing(2.5),
    },
    typo2: {
      marginBottom: theme.spacing(2.5),
    },
    divider: {
      marginBottom: theme.spacing(2.5),
      backgroundColor: "#BDBDBD",
    },
    button: {
      backgroundColor: theme.palette.primary.main,
    },
  }));

const Jumbotron = () => {
  const classes = useStyles();

  return (
    <div className={classes.root1}>
      <Paper className={classes.paper1}>
        <div className={classes.root2}>
          <Typography variant="h2" component="h1" className={classes.title}>
            Hello world!
          </Typography>
          <Typography variant="body1" className={classes.typo1}>
        This is a simple hero unit, a simple jumbotron-style&nbsp;
        component for calling extra attention&nbsp;
        to featured content or information.
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body2" className={classes.typo2}>
        It uses utility classes for typography and spacing to space&nbsp;
        content out within the larger container.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Learn More
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Jumbotron;
