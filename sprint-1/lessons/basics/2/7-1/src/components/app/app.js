import React from 'react';
import appStyles from './app.module.css';
import mainImage from '../../images/main.jpg';

import Header from '../header/header';
import Main from '../main/main';

class App extends React.Component {
  render() {
    const mainData = {
      title: "Группа поддержки",
      description: "Это самые преданные болельщики, которые будут радоваться твоим успехам и грустить вместе с тобой в тяжёлые времена",
      caption: "Нужно не забыть покормить их",
      image: mainImage
    }

    return (
      <div className={appStyles.app}>
        <Header />
        <Main mainData={mainData} />
      </div>
    );
  }
}

export default App;