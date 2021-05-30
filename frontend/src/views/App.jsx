import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'use-interval';

import FileExplorer from '../components/FileExplorer';
import FileContent from '../components/FileContent';
import { refreshFiles } from '../store/files/files-actions';

import styles from "./App.module.css";

const POLL_INTERVAL = 5000;

function App() {
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(refreshFiles());
  }, POLL_INTERVAL, true);

  const { list, hasError } = useSelector(store => store.files.file);
  const { selectedFile } = useSelector(store => store.filemanager);

  return (
    <div className={styles.AppContainer}>
      {
        hasError ? <div className={styles.Error}>
          <h3>An error occured while fetching the files</h3>
        </div> : (
          <div className={styles.App}>
            <FileExplorer files={list} />
            <FileContent file={selectedFile} />
          </div>
        )
      }
    </div>
  );
}

export default App;
