import * as API from './apiCall';

export const tryUnfavorite = async (id, userID) => {

  const url = `http://localhost:3000/api/users/${userID}/favorites/${id}`
  await API.fetchPost(url,
    {
      method: 'DELETE',
      body: JSON.stringify({
        user_id: userID, movie_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

export const tryFavorite = async (title, id, userID, poster_path, release_date, vote_average, overview) => {

  await API.fetchPost('http://localhost:3000/api/users/favorites/new',
    {
      method: 'POST',
      body: JSON.stringify({
        movie_id: id, user_id: userID, title, poster_path,
        release_date, vote_average, overview
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

