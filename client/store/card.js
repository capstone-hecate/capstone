import axios from 'axios'

const CREATE_CARD = 'CREATE_CARD'
const ADD_URL = 'ADD_URL'
const SET_CARD = 'SET_CARD'

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

export const createNewCard = card => async dispatch => {
  try {
    //dispatch comes first so that the card data is sent on time for FinalCard component to mount & render text
    dispatch(createCard(card))
    const {data} = await axios.post('/api/cards/', card)
    //dispatch happens a second time so that we have access to the cardId, for the addUrl thunk
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

// should this dispatch something on success?
// option 1: move to react
// option 2: add in dispatch for success vs. failure case
export const sendEmail = card => async dispatch => {
  try {
    await axios.post(`/api/emails`, card)
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
