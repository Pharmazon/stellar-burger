import React from 'react';
import headerLogo from '../../images/logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img alt="логотип." src={headerLogo}/>
        <h1>Собачки, следящие за тобой, пока ты изучаешь React</h1>
      </header>
    );
  }
}

export default Header;