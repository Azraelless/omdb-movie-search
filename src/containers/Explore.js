/* eslint-disable no-undef */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovie, reset } from './../actions'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: 2.5 * theme.spacing.unit,
  },
})

class Explore extends Component {

  constructor(props) {
    super(props);

    const { title, year } = props.match.params
    
    this.state = {
      title: title || "",
      year: year || "",
      error: false
    };

    if (title) {
      const { loadMovie, reset } = props
      reset()
      loadMovie(title, year)
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.title !== this.props.match.params.title || 
        nextProps.match.params.year !== this.props.match.params.year) {
      const { title, year } = nextProps.match.params
      const { loadMovie, reset } = nextProps
      this.setState({
        title: title,
        year: year || "",
        error: false
      })
      reset()
      loadMovie(title, year)
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let state = this.state
    state[name] = value
    this.setState(state);
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmitClick()
    } else if (e.target.name === "title") {
      const { title, year } = this.state
      this.setState({
        title: title,
        year: year,
        error: false
      })
    }
  }

  handleSubmitClick = () => {
    const { reset } = this.props
    const { title, year } = this.state

    if (title) {
      if (year)
        this.props.history.push('/' + title + '/' + year)
      else
        this.props.history.push('/' + title)
    } else {
      reset()
      this.setState({
        title: "",
        year: year,
        error: true
      })
    }
  }

  handleReset = () => {
    const { reset } = this.props
    reset()
    this.setState({
      title: "",
      year: "",
      error: false
    })
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props    

    return (
      <div>
        <Typography variant="display2">OMDb API</Typography>
        <FormControl error={this.state.error}>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input 
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
            onKeyUp={this.handleKeyUp} />
          {this.state.error && <FormHelperText>This field is required.</FormHelperText>}
        </FormControl>
        <TextField
          label="Year"
          name="year"
          type="number"
          className={classes.input}
          value={this.state.year}
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyUp} />
        <br />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitClick}>
          Submit
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleReset}>
          Reset
        </Button>
      </div>
    )
  }
}

export default withRouter(connect(null, { loadMovie, reset })(withStyles(styles)(Explore)))
