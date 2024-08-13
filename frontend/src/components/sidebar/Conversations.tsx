//1. useGetconversations() hook으로부터 로그인된 user를 제외 한 모든 user data(conversations)를 get
//2. conversations을 map()으로 돌려 conversation 생성 후 emoji와 함께 props로 Conversation.tsx 로 전달


import React from 'react'
import useGetConversations from '../../hooks/useGetConversations';
import Conversation from "./Conversation"
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
    //로그인된 유저를 제외한 user data 담고 있는 conversations를 받아온다. 
    const { loading, conversations} = useGetConversations();

    return (
      <div className='py-2 flex flex-col overflow-auto'>
          {conversations.map((conversation) => (
            <Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()} />
          ))}
          {loading ? <span className='loading loading-spinner mx-auto' /> : null}
      </div>
    );
};

export default Conversations;