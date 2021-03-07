import React, { FC } from "react";
import { Button, Paper } from "@material-ui/core";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import theme from "../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(4),
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    divider: {
      backgroundColor: theme.palette.grey[200],
    },
  }));

const Jumbotron: FC<JumbotronProps> = ({
  bgImage,
  // className = "",
  title = "Random Title, To Replace!",
  text1 = "Blablabla, blabla! replacethis text!",
  text2 = "",
  btnText = "Explore More",
  btnUrl = "#" }: JumbotronProps) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      style={{ backgroundImage: `url(${bgImage})` }}
      sx={{
        color: "#fff",
        backgroundBlendMode: "multiply",
        backgroundColor: theme.palette.grey[500],
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: "2rem" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: "1.5rem" }}
      >
        {text1}
      </Typography>
      <Divider
        className={classes.divider}
        sx={{ marginBottom: "1.5rem" }}
      />
      <Typography
        variant="body2"
        sx={{ mb: "2rem" }}
      >
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
    </Paper>
  );
};

type JumbotronProps = {
  bgImage: string,
  // className?: string,
  title?: string,
  text1?: string,
  text2?: string,
  btnText?: string,
  btnUrl?: string,
};

export default Jumbotron;
