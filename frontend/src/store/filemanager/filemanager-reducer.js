import * as types from '../constants'

export const initialState = {
  selectedFile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_FILE: {
      return {
        ...state,
        selectedFile: action.file ?? initialState.selectedFile
      }
    }
    default: {
      return state;
    }
  }
};
