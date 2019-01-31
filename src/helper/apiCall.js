export const fetchData = async (url) => {
  const response = await fetch(url)
  if(response.ok) {
    return response.json() 
  } else {
    throw new Error(`Error fetching, code: ${response.status}`)
  }
}

export const fetchPost = async (url, options) => {
  const response = await fetch(url, options)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error(response.status)
  }
}