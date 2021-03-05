import React, { FC } from "react";
import {
  Grid,
  Card,
  Typography,
  Link as MUILink,
  CardContent } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CalendarToday, Person } from "@material-ui/icons";
import { Tutorial } from "../types";
import testImage from "../assets/images/meritt-thomas-KTYjVDmN4A4-unsplash.jpg";

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

const TutorialCard: FC<TutorialCardProps> = ({
  tutorial,
  reverse = false,
  className,
}: TutorialCardProps) => {
  const classes = useStyles();

  return (
    <Card elevation={2} className={className}>
      <Grid
        container
        direction={(reverse) ? "row-reverse" : "row"}
      >
        <Grid item xs={12} md={5} className={classes.tutImageContainer}>
          <div
            className={classes.tutImage}
            style={{ backgroundImage: `url(${testImage})` }}
          >
          </div>
        </Grid>

        <Grid item xs={12} md={7}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5"
              className={classes.tutTitle}>{tutorial.title}</Typography>

            <Grid
              container
              alignItems="center"
              className={classes.tutInfo}>
              <Person/>
              <Typography variant="body2"
                className={classes.infoTypo}>Author???</Typography>
              <CalendarToday/>
              <Typography
                variant="body2"
                className={classes.infoTypo}
              >
                {tutorial.createdAt}
              </Typography>
            </Grid>

            <Typography
              variant="body1"
              className={classes.tutDescription}>
              {tutorial.description}
            </Typography>

            <Typography>
              <MUILink
                href={tutorial._id}
                color="primary">
                    Read More
              </MUILink>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

type TutorialCardProps = {
  tutorial: Tutorial,
  reverse?: boolean,
  className?: string,
};

export default TutorialCard;
