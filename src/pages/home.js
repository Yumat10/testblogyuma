import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import BlogCard from "../components/BlogCard";
import NewPostDialog from "../components/NewPostDialog";
import axios from "axios";

//Mui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

const styles = () => ({
  appBar: {
    padding: "10px",
  },
  mainGrid: {
    margin: "0px auto",
    padding: "30px 0px",
    maxWidth: "750px",
  },
});

class home extends Component {
  state = {
    blogs: [],
  };
  componentDidMount() {
    axios
      .get("/blogs")
      .then((documents) => {
        this.setState({
          blogs: documents.data,
        });
        console.log(this.state.blogs);
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4">Yuma's Blog</Typography>
            <NewPostDialog className={classes.newButton} />
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={3}
          className={classes.mainGrid}
        >
          {this.state.blogs.map((blog) => (
            <Grid item>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(home);
