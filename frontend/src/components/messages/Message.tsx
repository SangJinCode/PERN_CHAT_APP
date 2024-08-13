import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation, { MessageType } from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }: {message: MessageType}) => {

    //get the login user 
    const {authUser} = useAuthContext();
    
    // selected receiver
    const { selectedConversation } = useConversation();

    //message의 senderId와 로그인된 유저 id가 같은지 확인
    const fromMe = message?.senderId === authUser?.id;
    
    //fromMe의 boolean 값에따라 로그인된 유저의 profilePic과 선택된 유저의 profilePic을 적용
    const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic
   
    //로그인된 유저 유무에 따라 다른 CSS 값적용
    const chatClass = fromMe ? "chat-end" : "chat-start";
    const bubbleBg = fromMe ? "bg-blue-500" : "";

    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClass}`}>
            <div className='hidden md:block chat-image avatar'>
                <div className='w-6 md:w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={img} />
                </div>
            </div>
            <p className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}>{message.body}</p>
            <span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
                {extractTime(message.createdAt)}
            </span>
        </div>
    );
};

export default Message;