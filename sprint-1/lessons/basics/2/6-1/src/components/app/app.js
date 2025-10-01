import React from 'react';
import appStyles from './app.module.css';
import mainImage from '../../images/main.jpg';

import Header from '../header/header';
import Main from '../main/main';

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.app}>
        <Header />
        <Main image={mainImage} />
      </div>
    );
  }
}

export default App;