import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";

//useGetMessages()로 부터 selectedConveration.id에 해당하는 message를 받아온다.
const Messages = () => {
  const {loading, messages} = useGetMessages()
  console.log(messages)
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* loading이 true이면(useGetMessages()로 부터 message를 얻어오는 중) MessageSkeletond을 3번 띄우는 효과를 준다.  */}
      {/* [...Array(3)]는 [undefined, undefined, undefined]인 array이고 idx 만 사용하는 목적 */}
    
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}/>)}

      {/* message를 다 받아오며면(loading 값 false) <Message> 호출한다. */}
      {!loading && messages.map((message) => <Message key={message.id} message={message} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;