import React from 'react';

class Main extends React.Component {
  render() {
    return (
      <main>
        <img src={this.props.image} alt="фото собачек." />
      </main>
    );
  }
}

export default Main;