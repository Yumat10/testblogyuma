import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//Mui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const styles = () => ({
  titleDiv: {
    padding: "30px",
    background: "linear-gradient(90deg, #c2e9fb,#81a4fd)",
    minHeight: 150,
    textAlgin: "left",
  },
  titleText: {
    paddingTop: "30px",
    color: "#FFFFFF",
  },
  bottomDiv: {
    padding: "10px 30px",
    color: "#3D0D95",
  },
});

class BlogCard extends Component {
  handleClick = () => {
    console.log("clicked");
  };

  render() {
    const { classes } = this.props;
    const { _id, title, name, date } = this.props.blog;
    return (
      <Card>
        <CardActionArea>
          <Link to={`/blog/${_id}`} style={{ textDecoration: "none" }}>
            <Grid container direction="column">
              <Grid item>
                <div className={classes.titleDiv}>
                  <Typography variant="h3" className={classes.titleText}>
                    {title}
                  </Typography>
                </div>
              </Grid>
              <Grid item className={classes.bottomDiv}>
                <Typography variant="h5" className={classes.nameText}>
                  {name}
                </Typography>
                <Typography variant="body1">
                  {dayjs(date).format("dddd, MMMM D, YYYY @ h:mm:ssa")}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(BlogCard);
