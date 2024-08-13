
import useConversation from '../../zustand/useConversation';


//conversation은 Conversations.tsx에서 map()사용해 뽑아낸 1개의 user data
//conversation의 상태를 전역에서 관리하기 위해 zustand로 생성한 setSelectedConversation(conversation)을 실행 

const Conversation = ({conversation, emoji}: { conversation: ConversationType; emoji: string}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?.id === conversation.id //selectedConversation에 data가 없을때는 false
  console.log("selectedConversation in Conversation():", selectedConversation) 

  const isOnline = false;
 
  return (
    <>
      <div 
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
          ${isSelected ? "bg-sky-500" : ""}`}
        onClick={()=> setSelectedConversation(conversation)}
        >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-8 md:w-12 rounded-full'>
            <img src={conversation.profilePic} alt='user avatar' />
          </div>
        </div>
      
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200 text-sm md:text-md'>
              {conversation.fullName}
            </p>
            <span className='text-xl hidden md:inline-block'>{emoji}</span>
          </div>
        </div>
        <div className='divider my-0 py-0 h-1'/>
      </div>
    </>
  )
}

export default Conversation;