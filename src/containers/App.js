/* eslint-disable no-undef */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Explore from './Explore'
import Movie from './../components/Movie'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    padding: "1em"
  }
})

class App extends Component {
  render() {
    const { movie, errorMessage, classes } = this.props
    const { title, year } = this.props.match

    return (
      <div className={classes.container}>
        <Explore title={title} year={year} />
        <br />
        <Typography variant="title">{errorMessage}</Typography>
        <Movie movie={movie}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.movie,
  errorMessage: state.errorMessage
})

export default withRouter(connect(mapStateToProps, {})(withStyles(styles)(App)))
