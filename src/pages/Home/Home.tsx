import React from "react";
import { Grid, Container, Hidden } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 600,
      margin: "auto",
      marginTop: theme.spacing(5),
    },
    title: {
      padding:
      `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle,
    },
    media: {
      minHeight: 400,
    },
    imageCredit: {
      marginTop: 15,
    },
  }));

const Home = (): JSX.Element => {
  const classes = useStyles();
  console.log(classes);

  return (
    <Container fixed>
      <Grid spacing={4} container>
        <Hidden only={["sm", "md"]}>
          <Grid item lg={3} >
            <ProfileCard />
          </Grid>
        </Hidden>
        <Grid item xs={12} lg={9} >
          <Jumbotron />
          {/* List of recent tutorials */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
