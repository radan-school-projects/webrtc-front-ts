import React from "react";
import {
  Grid,
  Card,
  Typography,
  Link as MUILink,
  CardContent } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import testImage from "../assets/images/test_image.png";
import { CalendarToday, Person } from "@material-ui/icons";

const tuts = [
  {
    "title": "The very first tutorial",
    // eslint-disable-next-line max-len
    "text": "Lorem ipsumo obcaecati enim dicta praesenti numquam. Veritatis, sit.",
    "author": "Radan devist",
    "pubDate": "01-01-2021",
    "featuredImage": testImage,
    "url": "#",
  },
  {
    "title": "The second tutorial",
    // eslint-disable-next-line max-len
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.",
    "author": "John Doe",
    "pubDate": "01-02-2021",
    "featuredImage": testImage,
    "url": "#",
  },
  {
    "title": "The third tutorial",
    // eslint-disable-next-line max-len
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.",
    "author": "Mary Jane",
    "pubDate": "01-03-2021",
    "featuredImage": testImage,
    "url": "#",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tutCard: {
      marginBottom: theme.spacing(5),
    },
    tutImageContainer: {
      minHeight: theme.spacing(30),
    },
    tutImage: {
      height: "100%",
      widht: "auto",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    },
    cardContent: {
      minHeight: theme.spacing(22),
      padding: theme.spacing(3),
    },
    tutTitle: {},
    tutInfo: {
      color: theme.palette.grey[500],
      marginBottom: theme.spacing(2.5),

    },
    tutDescription: {
      marginBottom: theme.spacing(2.5),
    },
    readMoreLink: {
      marginRight: theme.spacing(2.5),
    },
    infoTypo: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(1),
    },
  }));

const TutsList = () => {
  const classes = useStyles();

  return (
    <div>
      {tuts.map((e, index) => (
        <Card key={e.title} elevation={2} className={classes.tutCard}>
          <Grid
            container
            direction={((index+1)%2 == 0) ? "row-reverse" : "row"}>
            <Grid item xs={12} md={5} className={classes.tutImageContainer}>
              <div
                className={classes.tutImage}
                style={{ backgroundImage: `url(${e.featuredImage})` }}>
              </div>
            </Grid>

            <Grid item xs={12} md={7}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5"
                  className={classes.tutTitle}>{e.title}</Typography>

                <Grid
                  container
                  alignItems="center"
                  className={classes.tutInfo}>
                  <Person/>
                  <Typography variant="body2"
                    className={classes.infoTypo}>{e.author}</Typography>
                  <CalendarToday/>
                  <Typography variant="body2"
                    className={classes.infoTypo}>{e.pubDate}</Typography>
                </Grid>

                <Typography
                  variant="body1"
                  className={classes.tutDescription}>
                  {e.text}
                </Typography>

                <Grid
                  container
                  justify="flex-end">
                  <Typography className={classes.readMoreLink}>
                    <MUILink
                      href={e.url}
                      color="primary">
                    Read More
                    </MUILink>
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
};

export default TutsList;
