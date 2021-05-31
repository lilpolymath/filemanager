import arrayToTree from '../../utils/arrayToTree'
import * as types from '../constants'

export const receiveFilesComplete = files => {
  return {
    type: types.RECIEVE_FILES,
    files
  };
};

export const recieveFileStart = () => {
  return {
    type: types.RECIEVE_FILES_START,
  };
}

export const recieveFileError = (message) => {
  return {
    type: types.RECIEVE_FILES_ERR,
    error: message
  };
}

export const refreshFiles = () => {

  return async dispatch => {
    try {
      dispatch(recieveFileStart())

      const response = await fetch('https://filemanager-lilpolymath.cloud.okteto.net/api/files')
      const files = await response.json()
      const fileTree = arrayToTree(files)

      dispatch(receiveFilesComplete(fileTree))

    } catch (err) {
      dispatch(recieveFileError(err.message))
    }
  };
};
