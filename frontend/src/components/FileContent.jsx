import React from 'react';
import PropTypes from 'prop-types';

import styles from "./FileContent.module.css";

function FileContent({ file = null }) {
  return (
    <section className={styles.FileContent}>
      <pre>
        {file?.content && atob(file.content)}
      </pre>
    </section>
  );
}

FileContent.propTypes = {
  file: PropTypes.object
};

export default FileContent;
