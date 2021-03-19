import axios from 'axios'

const CREATE_CARD = 'CREATE_CARD'

export const createCard = card => ({
  type: CREATE_CARD,
  card
})

export const createNewCard = card => async dispatch => {
  try {
    console.log('In the thuuunnkkk', card)
    const {data} = await axios.post('/api/cards/card', card)
    dispatch(createCard(data))
  } catch (err) {
    console.log('Cannot create new card')
  }
}

export default function cardReducer(state = [], action) {
  switch (action.type) {
    case CREATE_CARD:
      return [...state, action.card]
    default:
      return state
  }
}
