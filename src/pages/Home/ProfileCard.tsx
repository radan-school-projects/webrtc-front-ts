import React from "react";
import { Avatar, Card, CardContent, Grid, Typography, Link as MuiLink }
  from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import avatarImage from "../../assets/images/radan3-profile-pic.png";
import { Facebook, GitHub, LinkedIn } from "@material-ui/icons";

const socialMedias = [
  {
    name: "facebook",
    url: "www.facebook.com/radandevist",
    icon: <Facebook/>,
  },
  {
    name: "github",
    url: "www.github.com/radandevist",
    icon: <GitHub/>,
  },
  {
    name: "linkedin",
    url: "www.linkedin.com/radandevist",
    icon: <LinkedIn/>,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardTop: {
      backgroundColor: theme.palette.primary.light,
      width: "100%",
      height: theme.spacing(15),
      marginBottom: theme.spacing(5),
    },
    avatar: {
      height: theme.spacing(12.5),
      width: theme.spacing(12.5),
      borderStyle: "solid",
      borderWidth: theme.spacing(0.5),
      borderColor: theme.palette.primary.contrastText,
      margin: "0 auto",
      position: "relative",
      top: theme.spacing(8),
    },
    typo1: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(3),
      color: theme.palette.grey[800],
    },
    typo2: {
      marginBottom: theme.spacing(6),
      color: theme.palette.grey[500],
    },
    iconsGridContainer: {
      marginBottom: theme.spacing(0.5),
    },
    iconGridItem: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    iconLink: {
      color: theme.palette.grey[500],
    },
  }));

const ProfileCard = () => {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <div className={classes.cardTop}>
          <Avatar
            src={avatarImage} alt="Radan Devist" className={classes.avatar} />
        </div>
        <CardContent>
          <Typography variant="h6" align="center" className={classes.typo1}>
            Radan devist
          </Typography>
          <Typography variant="body1" align="center" className={classes.typo2}>
            A strange minded kiddo who claims to be a self-taught developper.
          </Typography>
          <Grid
            container
            justifyContent="center"
            className={classes.iconsGridContainer}
          >
            {socialMedias.map((e) => (
              <Grid item key={e.name} className={classes.iconGridItem}>
                <MuiLink
                  href={`https://${e.url}`} target="_blank" className={classes.iconLink}>
                  {e.icon}
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
