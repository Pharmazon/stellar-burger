import React from 'react';

import Header from '../header/header';
import Main from '../main/main';
import mainImage from '../../images/main.jpg';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main image={mainImage}/>
      </div>
    );
  }
}

export default App;