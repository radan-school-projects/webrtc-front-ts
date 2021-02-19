import React from "react";
import useStyles from "./Home.style";
import { Card, Typography, CardMedia, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import unicornImage from
  "../../assets/images/meritt-thomas-KTYjVDmN4A4-unsplash.jpg";

// type HomeProps = {}

const Home = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title} >
        Home Page
      </Typography>
      <CardMedia
        className={classes.media}
        image={unicornImage}
        title="A fantasy unicorn"
      />
      <CardContent>
        <span>Photo by <a href="https://unsplash.com/@merittthomas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Meritt Thomas</a> on <a href="https://unsplash.com/s/photos/unicorn?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
        <br/><br/>
        <Typography variant="body2" component="p">
          Welcome to This MERN Boilerplate, &nbsp;
          <Link to="/form">visit another page</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
