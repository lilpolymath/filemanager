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

      const response = await fetch('https://filemanager-lilpolymath.cloud.okteto.net/api/files')
      const files = await response.json()
      console.log(files);
      dispatch(receiveFilesComplete(files))

    } catch (err) {
      dispatch(recieveFileError(err.message))
    }
  };
};
