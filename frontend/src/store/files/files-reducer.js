export const initialState = {
  loaded: false,
  file: {
    list: [],
    hasError: null,
    isLoading: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'files/receiveFiles':
      console.log("suceess");
      return {
        ...state,
        file: {
          ...state.file,
          hasError: null,
          isLoading: false,
          list: action.files ?? []
        }
      };
    case 'files/receiveFiles-err':
      console.log("err");
      return {
        ...state,
        file: {
          ...state.file,
          hasError: action.error,
          isLoading: false
        }
      };
    case 'files/receiveFiles-start':
      console.log("start");
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
