import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import FileIcon from '../assets/images/file.svg';
import FolderIcon from '../assets/images/folder.svg';

import styles from "./FileExplorer.module.css";
import { selectFile } from '../store/filemanager/filemanager-actions';

const RenderFile = ({ file, index, onFileClick }) => {
  const { selectedFile } = useSelector(store => store.filemanager);

  const isSelected = selectedFile?.id === file.id

  return (
    <div>
      <div onClick={() => onFileClick(file)} className={isSelected ? `${styles.FileExplorerItem} ${styles.FileExplorerItemActive}` : `${styles.FileExplorerItem}`} style={{
        padding: `8px 18px 8px ${18 + index * 8}px`
      }}>
        <div className={styles.FileExplorerItemMeta}>
          {
            {
              'folder': <FolderIcon className={styles.FileExplorerIcon} />,
              'file':
                <FileIcon className={styles.FileExplorerIcon} />
            }[file.kind]
          }

          {file.name}
        </div>
        {file.kind === 'file' && <div className={styles.FileExplorerSize}>
          {file.size} kb
      </div>}
      </div>

      {file.children.length !== 0 && <div className={styles.FileExplorerChild}>
        {file?.children.map(child => (
          <RenderFile key={child.id} onFileClick={onFileClick} index={index + 1} file={child} />))}
      </div>}
    </div>
  )
}


export const FileExplorer = ({ files = [] }) => {
  const dispatch = useDispatch();

  const onFileClick = (file) => {
    dispatch(selectFile(file));
  }

  return (
    <div className={styles.FileExplorer}>
      {files.length === 0 ?
        <div className={styles.FileExplorerEmpty}>
          The root folder is empty.
        </div>
        :
        files.map(file => (
          <RenderFile onFileClick={onFileClick} key={file.id} index={0} file={file} />))
      }
    </div>
  );
}

FileExplorer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
};

export default FileExplorer;
