import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

import { MessageCircle } from "lucide-react";

const MessageContainer = () => {
	//selectedConversation은 나열된 user list에서 선택된 user data로 zustand로 부터 전달
	const { selectedConversation } = useConversation();

	return (
		<div className='w-full flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>

					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const {authUser} = useAuthContext()

	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-20
			font-semibold flex flex-col items-center gap-2">
				<p>Welcom 🤩 {authUser?.fullName} ❄️</p>
				<p>Select a chat ot start messageing</p>
				<MessageCircle className="text-3xl md:text-6xl text-center"/>
			</div>
		</div>
	)

}