import axios from 'axios'

const CREATE_CARD = 'CREATE_CARD'
const ADD_URL = 'ADD_URL'

export const createCard = card => ({
  type: CREATE_CARD,
  card
})

export const _addUrl = card => ({
  type: ADD_URL,
  card
})

export const createNewCard = card => async dispatch => {
  try {
    console.log('In the thuuunnkkk', card)
    const {data} = await axios.post('/api/cards/', card)
    dispatch(createCard(data))
  } catch (err) {
    console.log('Cannot create new card')
  }
}

export const addUrl = (card, cardUrl) => async dispatch => {
  try {
    console.log('In addUrl thunk')
    await axios.put(`/api/cards/${card.id}`, cardUrl)
    // const {data} = await axios.put(`/api/cards/${card.id}`, cardUrl)
    // dispatch(_addUrl(data))
  } catch (error) {
    console.log('Error sending Card URL')
  }
}

export default function cardReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CARD:
      return {...state, card: action.card}
    case ADD_URL:
      return {...state, card: action.card}
    default:
      return state
  }
}
