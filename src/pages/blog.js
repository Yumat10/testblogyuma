import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import dayjs from "dayjs";

//Mui stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";

const styles = () => ({
  card: {
    margin: "50px auto",
    padding: "30px 50px",
    maxWidth: "1000px",
  },
  deleteIcon: {
    marginLeft: "95%",
  },
  titleDiv: {
    padding: "10px 0px",
    minHeight: 100,
    textAlgin: "left",
  },
  bodyText: {
    lineHeight: 1.3,
  },
});

class blog extends Component {
  state = {
    title: "",
    name: "",
    date: "",
    content: "",
  };

  handleClose = () => {
    const blogId = this.props.match.params.blogId;
    axios
      .delete(`/blogs/${blogId}`)
      .then((doc) => {
        console.log(doc.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => window.history.back(), 1000);
  };

  componentDidMount() {
    const blogId = this.props.match.params.blogId;
    axios
      .get(`/blogs/${blogId}`)
      .then((doc) => {
        this.setState({
          title: doc.data.title,
          name: doc.data.name,
          date: doc.data.date,
          content: doc.data.content,
        });
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.deleteIcon}>
            <IconButton onClick={this.handleClose}>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <div className={classes.titleDiv}>
              <Typography variant="h2" className={classes.titleText}>
                {this.state.title}
              </Typography>
            </div>
          </Grid>
          <Grid item className={classes.bottomDiv}>
            <Typography variant="h5" className={classes.nameText}>
              {this.state.name}
            </Typography>
            <Typography variant="body1">
              {dayjs(this.state.date).format("dddd, MMMM D, YYYY @ h:mma")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.bodyText}>
              {this.state.content}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(blog);
