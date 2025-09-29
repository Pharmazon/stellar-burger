import React from 'react';
import './styles.css';

const Message = ({ message, repliedMessage, className = 'message' }) => {
  return (
    <div className={className}>
      {repliedMessage && <RepliedMessage message={repliedMessage} />}
      <h3>{message.user}</h3>
      <p>{message.text}</p>
    </div>
  );
};

const RepliedMessage = ({ message }) => {
  return (
    <Message message={message} className={'replied-message'} />
  );
};

const Chat = ({ thread }) => {
  return (
    <div className='thread'>
      {thread.map(currentMessage => {
        const repliedMessage = currentMessage.replyTo
          ? thread.find(msg => msg.id === currentMessage.replyTo)
          : null;

        return (
          <Message
            key={currentMessage.id}
            message={currentMessage}
            repliedMessage={repliedMessage}
          />
        );
      })}
    </div>
  );
};

export default class App extends React.Component {
  state = {
    thread: [
      {
        id: 1,
        user: 'Тамара',
        text: 'Всем привет! Кто в курсе, когда в нашем доме отключат горячую воду?'
      },
      {
        id: 2,
        user: 'Алексей',
        replyTo: 1,
        text: 'В подъезде висит объявление, скоро буду там, сфотографирую и пришлю сюда'
      },
      {
        id: 3,
        user: 'Катя',
        replyTo: 2,
        text: 'О! Спасибо! Ждём! :)'
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <Chat thread={this.state.thread} />
      </div>
    );
  }
}