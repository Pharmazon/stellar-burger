import React from 'react';
import headerLogo from '../../images/logo.png';
import headerStyles from './header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <img className={headerStyles.logo} src={headerLogo} alt="логотип." />
        <h1 className={headerStyles.title}>Собачки, следящие за тобой, пока ты изучаешь React</h1>
      </header>
    );
  }
}

export default Header;