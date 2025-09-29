class Door extends React.Component {
  state = { isOpen: false };

  switchLock = () => {
    this.setState({ isOpen: !this.state.isOpen });
  } 

  render() {
    return (
      <div className={this.state.isOpen ? 'content bg_open' : 'content bg_close'}>
        <h1 className="content__title">{this.state.isOpen ? 'Замок открыт 🔓' : 'Замок закрыт 🔒'}</h1>
        <button className="content__btn" onClick={this.switchLock}>{this.state.isOpen ? 'Закрыть' : 'Открыть'}</button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Door />);