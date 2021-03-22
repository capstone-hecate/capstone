import axios from 'axios'

const CREATE_CARD = 'CREATE_CARD'
const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE'

export const createCard = card => ({
  type: CREATE_CARD,
  card
})

export const updateTemplate = template => ({
  type: UPDATE_TEMPLATE,
  template: template
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

export const updateTemplateThunk = template => dispatch => {
  console.log('inside the template thunk')
  dispatch(updateTemplate(template))
}

export default function cardReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_TEMPLATE:
      return {template: action.template}
    case CREATE_CARD:
      return {...state, card: action.card}
    default:
      return state
  }
}
