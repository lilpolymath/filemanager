import * as types from '../constants'

export const selectFile = file => {
  return {
    type: types.SELECT_FILE,
    file
  };
};