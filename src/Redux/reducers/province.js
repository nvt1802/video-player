import { handleActions } from 'redux-actions'

const provinceReducer = handleActions(
  {
    'PROVINCE_SUCCESS': (state, action) => {
      return {
        content: action.payload
      }
    },

    'PROVINCE_FAILURE': () => ({
      content: []
    })
  },
  { province: [] }
)

export default provinceReducer