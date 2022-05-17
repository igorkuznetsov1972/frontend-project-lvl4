import React from 'react';

const Messages = (props) => {
  const { messages } = props;

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
