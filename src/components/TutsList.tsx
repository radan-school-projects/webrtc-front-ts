import React from "react";
import { Grid, Card, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import testImage from "../assets/images/test_image.png";

const tuts = [
  {
    "title": "The very first tutorial",
    // eslint-disable-next-line max-len
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.",
    "author": "Radan devist",
    "pubDate": "01-01-2021",
    "featuredImage": testImage,
  },
  {
    "title": "The second tutorial",
    // eslint-disable-next-line max-len
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.",
    "author": "Radan devist",
    "pubDate": "01-02-2021",
    "featuredImage": testImage,
  },
  {
    "title": "The third tutorial",
    // eslint-disable-next-line max-len
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.",
    "author": "Radan devist",
    "pubDate": "01-03-2021",
    "featuredImage": testImage,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tutCard: {
      marginBottom: theme.spacing(2.5),
    },
    cardGridContainer: {
      height: "238px",
    },
    tutImageContain: {
      overflow: "hidden",
    },
    tutImage: {
      height: "100%",
      widht: "auto",
    },
  }));

const TutsList = () => {
  const classes = useStyles();

  return (
    <div>
      {tuts.map((e, index) => (
        <Card key={e.title} elevation={2} className={classes.tutCard}>
          <Grid container
            direction={((index+1)%2 == 0) ? "row-reverse" : "row"}
            className={classes.cardGridContainer}>
            <Grid item xs={5} className={classes.tutImageContain}>
              <img
                className={classes.tutImage}
                src={e.featuredImage}
                alt={e.title}/>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h5">{e.title}</Typography>
              <Typography variant="body1">{e.text}</Typography>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
};

export default TutsList;
