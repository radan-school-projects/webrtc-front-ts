import React, { FC } from "react";
import { Button, Paper } from "@material-ui/core";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      color: theme.palette.primary.contrastText,
    },
    paper1: {
      backgroundBlendMode: "multiply",
      backgroundColor: theme.palette.grey[500],
      backgroundSize: "cover",
      backgroundPosition: "center center",
      color: "inherit",
    },
    root2: {
      padding: theme.spacing(4),
      paddingBottom: theme.spacing(5.5),
    },
    title: {
      marginBottom: theme.spacing(5),
    },
    typo1: {
      marginBottom: theme.spacing(3.5),
    },
    typo2: {
      marginBottom: theme.spacing(5),
    },
    divider: {
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.grey[500],
    },
  }));

const Jumbotron: FC<JumbotronProps> = ({
  bgImage,
  className = "",
  title = "Random Title, To Replace!",
  text1 = "Blablabla, blabla! replacethis text!",
  text2 = "",
  btnText = "Explore More",
  btnUrl = "#" }: JumbotronProps) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root1} ${className}`}>
      <Paper
        className={classes.paper1}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={classes.root2}>
          <Typography variant="h2" component="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body1" className={classes.typo1}>
            {text1}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body2" className={classes.typo2}>
            {text2}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={btnUrl}
          >
            {btnText}
          </Button>
        </div>
      </Paper>
    </div>
  );
};

type JumbotronProps = {
  bgImage: string,
  className?: string,
  title?: string,
  text1?: string,
  text2?: string,
  btnText?: string,
  btnUrl?: string,
};

export default Jumbotron;
