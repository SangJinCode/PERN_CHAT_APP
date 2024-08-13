import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

type AuthUserType = {
    id: string,
    fullName: string,
    email: string,
    profilePic: string,
    gender: string,
};

//1. create context
const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});

//3. create useAuthContext to return useContext(AuthContext)
//eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
};

//2. create AuthContext provider
export const AuthContextProvider = ({children}:{children:ReactNode}) => { //ReactNode는 모든것을 허용하기 때문에 children 속성에서 만이 사용
    //로그인된 유저를 전달
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                console.log('Start fetch to /api/auth/me in fetchAuthUser()')
                const res =  await fetch("/api/auth/me");
                console.log("res",res)
                const data = await res.json();
                console.log("data",data)
                
                if(!res.ok) throw new Error(data.error);
                setAuthUser(data);
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchAuthUser();
    }, [])

    // Provider로 authUser(로그인된 유저), isLoading(AuthContext 작동유무확인 state), setAuthUser(authUser 상태관리)를 전달
    return (
        <AuthContext.Provider
            value={{
                authUser,
                isLoading,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};