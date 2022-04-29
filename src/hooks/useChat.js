import { useContext } from 'react';

import { ApiContext } from '../contexts/index.jsx';

const useChat = () => useContext(ApiContext);

export default useChat;
