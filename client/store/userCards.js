import axios from 'axios'

const GET_USER_CARDS = 'GET_USER_CARDS'

const defaultUser = {}


const _getUserCards = user => ({type: GET_USER_CARDS, user})

export const getUserCards = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(_getUserCards(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_CARDS:
      return action.user
    default:
      return state
  }
}
