import {useState} from 'react'
import { Link } from "react-router-dom";
import useSignup from '../hooks/useSignup';
import GenderCheckbox from '../components/GenderCheckbox';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const {loading, signup} = useSignup()

    //GenderCheckbox.tsx로 전달되어 "male" or "female" 값을 받아와 inputs의 gender 값을 변경한다.
    const handleCheckboxChange = (gender: "male" | "female") => {
        // console.log("gender in handleCheckboxChange:", gender)
        setInputs({...inputs, gender});
    }
    //e.preventDefault();는 <input>에 값이 입력되고 submit 되면 새로고침 되는 현상을 방지
    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("inputs in SignUp.tsx:",inputs)
        signup(inputs)
    };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
            backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                SignUp<span className='text-blue-500'>ChatApp</span>
            </h1>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input 
                        type='text'
                        placeholder='John Doe'
                        className='w-full input input-bordered h-10'
                        value={inputs.fullName}
                        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input 
                         type='text'
                         placeholder='Enter Username'
                         className='w-full input input-bordered h-10'
                         value={inputs.username}
                         onChange={(e) => setInputs({...inputs, username: e.target.value})}
                    />
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input 
                         type='text'
                         placeholder='Enter Password'
                         className='w-full input input-bordered h-10'
                         value={inputs.password}
                         onChange={(e) => setInputs({...inputs, password: e.target.value})}
                    />
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Confrim Password</span>
                    </label>
                    <input 
                        type='text'
                        placeholder='Confrim Password'
                        className='w-full input input-bordered h-10'
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                    />
                </div>
                <GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange}/>
                <Link 
                    to={"/login"}
                    className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
                >
                    Already have an account?
                </Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
};

export default SignUp;