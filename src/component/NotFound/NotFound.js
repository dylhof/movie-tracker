import React from 'react';
import {Link} from 'react-router-dom';

export const NotFound = () => {
  return(
    <div>
      <p>404 not Found.</p>
      <Link to={'/'}>Please go to MovieTracker Home</Link>
    </div>
  )
}