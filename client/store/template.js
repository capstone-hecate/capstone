const SET_TEMPLATE = 'SET_TEMPLATE'

export const _setTemplate = template => ({
  type: SET_TEMPLATE,
  template
})

export const setTemplate = template => dispatch => {
  dispatch(_setTemplate(template))
}

export default function templateReducer(state = {}, action) {
  switch (action.type) {
    case SET_TEMPLATE:
      return {...state, template: action.template}
    default:
      return state
  }
}
