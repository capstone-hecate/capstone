import axios from 'axios'

const CREATE_CARD = 'CREATE_CARD'
const ADD_URL = 'ADD_URL'
const SET_CARD = 'SET_CARD'
const SEND_EMAIL = 'SEND_EMAIL'

export const createCard = card => ({
  type: CREATE_CARD,
  card
})

export const _addUrl = card => ({
  type: ADD_URL,
  card
})

const setCard = card => ({
  type: SET_CARD,
  card
})

// const _sendEmail = card => ({
//   type: SEND_EMAIL,
//   card
// })

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
    const {data} = await axios.put(`/api/cards/${card.id}`, cardUrl)
    dispatch(_addUrl(data))
  } catch (error) {
    console.log('Error sending Card URL')
  }
}

export const fetchCard = cardId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cards/${cardId}`)
    dispatch(setCard(data))
  } catch (error) {
    console.log('Error fetching card')
  }
}

export const sendEmail = card => async dispatch => {
  try {
    const {data} = await axios.post(`/api/emails`, card)
    // dispatch(_sendEmail(data))
  } catch (err) {
    console.log('Cannot send email')
  }
}

export default function cardReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CARD:
      return {...state, card: action.card}
    case ADD_URL:
      return {...state, card: action.card}
    case SET_CARD:
      return {...state, card: action.card}
    default:
      return state
  }
}
