
export const receiveFiles = files => {
  return {
    type: 'files/receiveFiles',
    files
  };
};

export const refreshFiles = async () => {
  const files = await fetch('https://filemanager-lilpolymath.cloud.okteto.net/api/files')

  return async dispatch => {
    dispatch(receiveFiles(files.json()));
  };
};
