// only use hot-loader in THIS component!
import { hot } from 'react-hot-loader/root';

import React from 'react';
import styles from './App-styles.css';

const ColdApp = () => {
  return (
    <>
      <h1 className={styles.header}>App Name</h1>
      <p className={styles.content}>Some content</p>
    </>
  );
};

// this has no effect in production mode
const App = hot(ColdApp);

export { App };
