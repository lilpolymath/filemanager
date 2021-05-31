import * as types from '../constants'

export const initialState = {
  file: {
    list: [],
    hasError: null,
    isLoading: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECIEVE_FILES:
      return {
        ...state,
        file: {
          ...state.file,
          hasError: null,
          isLoading: false,
          list: action.files ?? []
        }
      };
    case types.RECIEVE_FILES_ERR:
      return {
        ...state,
        file: {
          ...state.file,
          hasError: action.error,
          isLoading: false
        }
      };
    case types.RECIEVE_FILES_START:
      return {
        ...state,
        file: {
          ...state.file,
          hasError: null,
          isLoading: true
        }
      };
    default: {
      return state;
    }
  }
};
