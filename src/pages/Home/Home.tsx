import React from "react";
import {
  Grid,
  Container,
  Hidden,
  Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Jumbotron from "../../components/Jumbotron";
import ProfileCard from "./ProfileCard";
import TutsList from "./TutsList";
import cookImg
  from "../../assets/images/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg";

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
      <Grid container spacing={4}>

        <Hidden only={["xs", "sm", "md"]}>
          <Grid item lg={3} >
            <ProfileCard />
          </Grid>
        </Hidden>

        <Grid item xs={12} lg={9} >
          <Jumbotron
            bgImage={cookImg}
            title="This is a React TS Frontend!"
            text1="Welcome to this rad simple react app!!
                I made it for demo and learning purpose."
            // text2="blablabla, encore du balbla!"
            btnText="Read More"
          />

          <Typography
            variant="h5"
            className={classes.tutsTitle}
          >
            Recent Tutorials
          </Typography>

          <TutsList/>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Home;
