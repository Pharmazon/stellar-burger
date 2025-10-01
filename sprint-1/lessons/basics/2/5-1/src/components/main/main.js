import React from 'react';

class Main extends React.Component {
  render() {
    return (
      <main>
        <img alt="фото собачек." src={this.props.image}/>
      </main>
    );
  }
}

export default Main;