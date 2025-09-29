class NavBar extends React.Component {
  render() {
    return (
      <header className='header'>
        {this.props.children}
      </header>
    );
  }
}

class Logo extends React.Component {
  render() {
    return (
      <img className='logo' src='./images/logo.svg' alt='логотип.' />
    );
  }
}

class Menu extends React.Component {
  render() {
    return (
      <nav className='menu'>
        {this.props.children}
      </nav>
    );
  }
}

class MenuItem extends React.Component {
  render() {
    return (
      <button className='item-btn' type='button'>{this.props.text}</button>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button className='log-in-btn' type='button'>{this.props.text}</button>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className='page'>
        <NavBar>
          <Logo />
          <Menu>
            <MenuItem text="О НАС" />
            <MenuItem text="ЦЕНЫ" />
            <MenuItem text="БЛОГ" />
          </Menu>
          <Button text="ВОЙТИ" />
        </NavBar>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);