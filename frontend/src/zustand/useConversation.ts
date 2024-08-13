import { create } from "zustand";

// type ConversationType = {
// 	id: string;
// 	fullName: string;
// 	profilePic: string;
// };

export type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt: string;
    shouldShake?: boolean;
};


//ConversationType은 전역에
interface ConversationState {
    selectedConversation: ConversationType | null;
    messages: MessageType[];
    setSelectedConversation: (conversation: ConversationType | null) => void; //리턴값이 필요없는 함수 사용시 void 설정
    setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation}), 
    messages: [],
    setMessages: (messages) => set({ messages: messages }),
}));

export default useConversation;

// JS VERSION
// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;