import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';

const Messages = (props) => {
  const { messages } = props;
  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [messages.length]);

  return (
    <>
      {messages.map(({ username, body, id }) => (
        <div className="text-break mb-2" key={id}>
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
    </>
  );
};

export default Messages;
