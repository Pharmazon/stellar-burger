import React from 'react';
import mainStyles from './main.module.css';

class Main extends React.Component {
  render() {
    const { image, caption, title, description } = this.props.mainData;
    
    return (
      <main className={mainStyles.main}>
        <img className={mainStyles.image} src={image} alt="фото собачек." />
        <span className={mainStyles.caption}>{caption}</span>
        <h2 className={mainStyles.title}>{title}</h2>
        <p className={mainStyles.description}>{description}</p>
      </main>
    );
  }
}

export default Main;