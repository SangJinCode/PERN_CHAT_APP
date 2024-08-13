import {Send} from "lucide-react"
import { useState } from "react"
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const {loading, sendMessage} =useSendMessage();

  // e.preventDefault();은 form submit은 실행되지만 form 자체가 새로고침되지는 않음
  //trim() 좌우 공백을 제거
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!message.trim()) return;
      //sendMessage() 실행하여 message를 DB에저장
      await sendMessage(message);
      //setMessage()는 빈 문자열로 초기화
      setMessage("")

  }

  return (
    <form className='px-4 mb-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input 
            type='text'
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700
             border-gray-600 text-white'
            placeholder='Send a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />

          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              <Send className='w-6 h-6 text-white'/>
            )}
            
          </button>
        </div>
    </form>
   
  )
}

export default MessageInput;