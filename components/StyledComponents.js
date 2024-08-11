import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #f9f9f9;
`;

export const Title = styled.h2`
  background-color: #4a90e2;
  color: white;
  text-align: center;
  margin: 0;
  padding: 15px 0;
`;

export const MessageList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const Message = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ sender }) => (sender === 'user' ? '#daf8cb' : '#ececec')};
  align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
`;

export const MessageInput = styled.input`
  width: calc(100% - 80px);
  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
  font-size: 16px;
`;

export const SendButton = styled.button`
  width: 80px;
  padding: 10px;
  border: none;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #357abd;
  }
`;

export const ClearButton = styled.button`
  width: 80px;
  padding: 10px;
  border: none;
  background-color: #d9534f;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

export const HelpButton = styled.button`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  border: none;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #4cae4c;
  }
`;
