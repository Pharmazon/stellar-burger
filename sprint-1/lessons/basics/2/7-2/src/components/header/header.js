import React from 'react';
import headerStyles from './header.module.css';
import headerLogo from '../../images/logo.png';

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