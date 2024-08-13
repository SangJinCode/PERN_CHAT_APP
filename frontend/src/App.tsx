
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import { useAuthContext } from './context/AuthContext.tsx';
import { Toaster } from "react-hot-toast" 

function App() {
  //authUser or not에 따른 효과 적용을 위한 state 
  const { authUser, isLoading }=useAuthContext()
  console.log("authuser in App.tsx:", authUser);

  //isLoading이 true이면 AuthContext가 fetch 중이기 때문에 null을 반환
  if(isLoading) return null;
  
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"}/>}/>
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"}/>}/>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"}/>}/>
      </Routes>
      <Toaster /> 
    </div>
  )
}

export default App;
