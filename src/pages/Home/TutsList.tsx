import React, { FC, useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Tutorial } from "../../types";
import TutorialCard from "../../components/TutorialCard";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { appApiAxios } from "../../config/axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tutCard: {
      marginBottom: theme.spacing(5),
    },
    cardSkeleton: {
      marginBottom: theme.spacing(5),
    },
  }));

const TutsList: FC = () => {
  const [data, setData] = useState<Array<Tutorial>>([]);
  const [error, setError] = useState<Error | null>(null);
  const { promiseInProgress } = usePromiseTracker();

  const classes = useStyles();

  // eslint-disable-next-line require-jsdoc
  async function loadPublishedTuts(): Promise<any> {
    try {
      const res = await appApiAxios.get("/tutorials");
      setData(res.data.data);
    } catch (err) {
      console.log(`could not fetch data:\n${err}`);
      setError(err);
    }
  }

  useEffect(() => {
    trackPromise(loadPublishedTuts());
  }, []);

  if (error) return <h1>{error.stack}</h1>;

  const tempArray = [1, 2, 3];

  return promiseInProgress ?
  (
    <div>
      {tempArray.map((e, index) => (
        <Grid
          key={index}
          container
          spacing={2}
          direction={isOdd(index + 1) ? "row-reverse" : "row"}
          className={classes.cardSkeleton}
        >
          <Grid item xs={12} md={5}>
            <Skeleton variant="rect" height="12rem"/>
          </Grid>
          <Grid item xs={12} md={7}>
            <Skeleton variant="text" height="1.5rem"/>
            <Skeleton variant="text" height="1.5rem"/>
            <Skeleton variant="text" height="1.5rem"/>
            <Skeleton variant="text" width="30%" height="1.5rem"/>
          </Grid>
        </Grid>
      ))}
    </div>
  ) :
  (
    <div>
      {data.map((tutorial, index) => (
        <TutorialCard
          key={index}
          tutorial={tutorial}
          reverse={isOdd(index + 1)}
          className={classes.tutCard}
        />
      ))}
    </div>
  );
};

// eslint-disable-next-line require-jsdoc
function isOdd(num: number) {
  return ((num) % 2) == 0;
}

export default TutsList;
