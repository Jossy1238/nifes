import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { login } from '../apis';

function Login(props) {
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({});
    
    function handleInputChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value})
    }

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true);
        console.log(formFields)

        try {
            const response = await login(formFields);
            if(response){
                setMessage(response.message)
                localStorage.setItem("nifes__token", response.token)
                navigate("/dashboard")
            }            
            
        } catch (error) {
            console.log(error)
            setMessage(error?.response?.data?.message)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div className='h-screen full-center'>
            <div className='w-3/4 login__screen flex items-center'>
                <div className='flex-1 signin__img'>
                    <img src="/hero.png" alt="" className='' />
                </div>
                <form onSubmit={handleLogin} className='flex-1 p-2 login__form'>
                    <NavLink to="/" className="mb-1 flex items-center rounded-md back__btn">
                        <i className='fas fa-arrow-left'></i>&nbsp;
                        Back
                    </NavLink>                    
                    <h1 className='text-4xl font-600 mb-2'>Sign in!</h1>
                    {message && <div className='border label__error mb-1'>{message}</div>}
                    <div className="form__group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' id='username' placeholder='Enter Username' className='flex-1' onChange={handleInputChange} required />
                    </div>
                    <div className="form__group my-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' placeholder='Enter password' className='flex-1' onChange={handleInputChange} required />
                    </div>
                    <div className='flex justify-end mb-2'>
                        <NavLink to="" className="opacity-5">Forgot Password?</NavLink>
                    </div>
                    <button className='main__btn px-3 justify-center flex items-center gap-2'>
                        Login
                        {loading && <Loader/>}
                    </button>
                </form>
            </div>            
        </div>
    );
}

export default Login;