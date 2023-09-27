import React, { useState } from 'react';
import "./Chat.css"

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    { id: 1, name: 'Conversation 1', messages: ['Message 1', 'Message 2'] },
    { id: 2, name: 'Conversation 2', messages: ['Message 3', 'Message 4'] },
    { id: 3, name: 'Conversation 3', messages: ['Message 5', 'Message 6'] },
  ];

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="chat-container">
      <div className="conversation-list">
        <button>Créer une conversation</button>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`conversation-item ${
              selectedConversation === conversation ? 'active' : ''
            }`}
            onClick={() => handleConversationClick(conversation)}
          >
            {conversation.name}
          </div>
        ))}
      </div>
      <div className="conversation-details">
        {selectedConversation ? (
          <div>
            <h3>{selectedConversation.name}</h3>
            <ul>
              {selectedConversation.messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Select a conversation</p>
        )}
      </div>
    </div>
  );
}
