import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MovieDetails extends Component{
  
  render() {
    const {title, release_date, overview, poster_path} = this.props
    const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`
    const alt = `${title} poster`
    return (
      <div>
        <h3>{title}</h3>
        <img src={poster} alt={alt} />
        <p>{release_date}</p>
        <p>{overview}</p>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(MovieDetails)