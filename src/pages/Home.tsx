import React from "react";
import {
  Grid,
  Container,
  Hidden,
  Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Jumbotron from "../components/Jumbotron";
import ProfileCard from "../components/ProfileCard";
import TutsList from "../components/TutsList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    jumbotron: {
      marginBottom: theme.spacing(2.5),
    },
    tutsTitle: {
      color: theme.palette.grey[700],
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2.5),
    },
  }));

const Home = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container fixed>
      <Grid spacing={4} container>
        <Hidden only={["xs", "sm", "md"]}>
          <Grid item lg={3} >
            <ProfileCard />
          </Grid>
        </Hidden>
        <Grid item xs={12} lg={9} >
          <div className={classes.jumbotron}>
            <Jumbotron />
          </div>

          <Typography
            variant="h5" className={classes.tutsTitle}>
              Recent tutorials
          </Typography>
          <div>
            <TutsList/>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
