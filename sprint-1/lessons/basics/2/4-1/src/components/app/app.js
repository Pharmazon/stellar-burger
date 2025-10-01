import React from 'react';
import Header from '../header/header.js';
import Main from '../main/main.js';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Main />
      </>
    );
  }
}

export default App;