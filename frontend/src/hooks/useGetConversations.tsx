import { useEffect, useState } from "react"
import toast from "react-hot-toast";

// api로 부터 로그인된 유저를 제외한 유저 정보를 받아온다.
const useGetConversations =() => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationType[]>([])

    useEffect(() => {
        const getConversations = async() => {
            setLoading(true);
            try {
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false)
            }
        }
        getConversations();
       
    }, [])
    //로그인된 유저를 제외한 user data를 담고 있는 conversations 반환
    return {loading, conversations};
}

export default useGetConversations;