import { useState } from "react"
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import {Search} from "lucide-react"
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();

    //로그인되 유저를 제외한 모드 유저 정보
    const { conversations} = useGetConversations();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validation
        if(!search) return;

        if (search.length <3) {
            return toast.error("Search term must be at least 3 characters long")
        }

        //conversations의 각 배열 요소를 find() 내부 콜백 함수의 인자(c)로 넘기고
        //c.fullName과 search의 값을 소문자로 변경 후 일치하는 값을 반환한다.
        const conversation = conversations.find((c:ConversationType) =>
            c.fullName.toLowerCase().includes(search.toLowerCase())
        );

        //search에 입력된 값과 일치하는 유저(conversation)을 setSelectedConversation()의
        //인수로 넣어 선택된 유저의 messages가 출력되게한다.
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else toast.error("No such user found!");
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder="Search..."
                className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button 
                type='submit'
                className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white"    
            >
                <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />

            </button>
        </form>
    )
}

export default SearchInput;