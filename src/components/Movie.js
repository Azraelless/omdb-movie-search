/* eslint-disable no-undef */

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Link from 'react-router-dom/Link'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
  },
  poster: {
    height: 375,
    display: "block",
    flex: "0 0 250px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    display: "flex",
  },
  rating: {
    display: "inline-flex",
    paddingTop: "1em",
  },
  small: {
    fontSize: ".7rem",
  },
  imdb: {
    paddingTop: ".6rem",
    lineHeight: "0.9em",
    display: "inline",
  },
  score: {
    fontSize: "1.5rem",
  },
  votes: {
    display: "block",
    fontSize: ".7rem",
  },
  star: {
    display: "inline",
    fontSize: "2rem",
    color: "GoldenRod",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "unset",
    fontSize: "1.1rem",
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
  website: {
    paddingTop: "1em",
  }
})

class Movie extends Component {

  render() {
    const { data, classes } = this.props
    let movie
    if (data) {
      movie = Object.values(data)[0]
    }

    return (
      <div>
        {data && 
          <Card className={classes.card}>
            <CardMedia image={movie.poster} className={classes.poster} /> 
            <CardContent className={classes.content}>
              <Typography variant="headline">{movie.title}</Typography>
              <Typography variant="subheading" color="textSecondary">{movie.year}</Typography>
              <br />
              <Typography><span className={classes.secondary}>Duration:</span> {movie.runtime}</Typography>
              <Typography><span className={classes.secondary}>Country:</span> {movie.country}</Typography>
              <Typography><span className={classes.secondary}>Director:</span> {movie.director}</Typography>
              <Typography><span className={classes.secondary}>Actors:</span> {movie.actors}</Typography>
              <br />
              <Typography>{movie.plot}</Typography>
              {movie.website && movie.website !== "N/A" && 
                <Typography className={classes.website}>
                  <Link to={movie.website} className={classes.link}>Website</Link>
                </Typography>}
              <div className={classes.rating}>
                <Icon className={classes.star}>star_rate</Icon>
                <Typography className={classes.imdb}>
                  <span className={classes.score}>
                    {movie.imdbRating}
                    <span className={classes.small}>/10</span>
                  </span>
                  <span className={classes.votes}>
                    {movie.imdbVotes}
                  </span>
                </Typography>
              </div>
            </CardContent>
            
          </Card>
        }
      </div>
    )
  }
}

export default withStyles(styles)(Movie)