import data from '../../../../api/data/files.json'


export const receiveFilesComplete = files => {
  return {
    type: 'files/receiveFiles',
    files
  };
};

export const recieveFileStart = () => {
  return {
    type: 'files/receiveFiles-start',
  };
}

export const recieveFileError = (message) => {
  return {
    type: 'files/receiveFiles-err',
    error: message
  };
}

export const refreshFiles = () => {

  return async dispatch => {
    try {
      console.log("here ppp");
      dispatch(recieveFileStart())

      const files = await fetch('http://cors-anywhere.herokuapp.com/https://filemanager-lilpolymath.cloud.okteto.net/api/files')
      dispatch(receiveFilesComplete(files.results))

    } catch (err) {
      dispatch(recieveFileError(err.message))
    }
  };
};
