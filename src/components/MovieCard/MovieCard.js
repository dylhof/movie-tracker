import React from 'react'

export const MovieCard = ({title, poster_path}) => {
  const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`
  const alt = `${title} poster`
  return(
    <div>
      <h2>{title}</h2>
      <img src={poster} alt={alt} />
      <button onClick={}><i className='fas fa-star'></i></button>
    </div>
  )
}

// If the user is logged in
  // check if the movie is a favorite
    // yes=> display with favorite indicated
// this will display a single movie 
// 