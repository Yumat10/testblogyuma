import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";

//Mui stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  dialog: {
    padding: "50px",
  },
  newButton: {
    position: "absolute",
    left: "auto",
    right: "50px",
    color: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: "#3f51b5",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#E26640",
    },
  },
});

class NewPostDialog extends Component {
  state = {
    title: "",
    content: "",
    name: "",
    errors: {},
    open: false,
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    delete this.state.errors[event.target.id];
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      title: this.state.title,
      name: this.state.name,
      content: this.state.content,
    };
    axios
      .post("/blogs/postBlog", newPost)
      .then((doc) => {
        console.log(doc);
        setTimeout(() => this.handleClose(), 1000);
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
        });
      });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleClick} className={classes.newButton}>
          New Post
        </Button>
        <Dialog
          maxWidth="md"
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogContent className={classes.dialog}>
            <form onSubmit={this.handleSubmit}>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <TextField
                    id="title"
                    label="Title"
                    helperText={
                      this.state.errors.title && this.state.errors.title
                    }
                    error={this.state.errors.title ? true : false}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="name"
                    label="Name"
                    helperText={
                      this.state.errors.name && this.state.errors.name
                    }
                    error={this.state.errors.name ? true : false}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="content"
                    label="Content"
                    helperText={
                      this.state.errors.content && this.state.errors.content
                    }
                    error={this.state.errors.content ? true : false}
                    multiline
                    rows={15}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    className={classes.submitButton}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(NewPostDialog);
