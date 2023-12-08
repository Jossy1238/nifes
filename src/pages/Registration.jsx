import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../apis';
import Loader from '../components/Loader';

function Registration(props) {


    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({});
    
    function handleInputChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value})
    }

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const messageRef = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        console.log(formFields)

        try {
            const response = await register(formFields);
            if(response){
                setMessage(response.message)
                navigate("/signin")
            }            
            
        } catch (error) {
            console.log(error)
            setMessage(error?.response?.data?.message)
            //Scroll to messageRef
            messageRef.current.scrollIntoView({behavior: 'smooth'})
        }
        finally{
            setLoading(false)
        }


    }

    const handleFileInputChange = (e)=>{
        setFormFields({...formFields, [e.target.name]: e.target.files[0]})
    }


    return (
        <>
            <Header/>
            <main className='top__padding'>
                <section className='bg__main p-5'>
                    <h1 className='text-5xl font-600'>Registration</h1>
                </section>

                <section className="p-5">
                    <form onSubmit={handleSubmit} className='flex flex-col w-1/2 mx-auto gap-1'>
                        <p className='text-xl'>Please provide your details</p>
                        {message && <div className='border label__error'>{message}</div>}
                        <div className="flex gap-2">
                            <div className="form__group">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name='fullName' id='fullName' placeholder='Enter Full Name' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' id='username' placeholder='Enter Username' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="form__group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' placeholder='Enter Email' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="profile">Profile picture</label>
                                <input type="file" name='image' id='profile' placeholder='Enter profile' className='flex-1' onChange={handleFileInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="form__group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" name='phoneNumber' id='phoneNumber' placeholder='Enter phone number' className='flex-1' />
                            </div>
                            <div className="form__group">
                                <label htmlFor="country">Country of residence</label>
                                <input type="text" name='currentCountry' id='country' placeholder='Enter country' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="form__group">
                                <label htmlFor="major">Majors</label>
                                <input type="text" name='major' id='major' placeholder='Enter major' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="degree">Degree Obtained</label>
                                <input type="text" name='degree' id='degree' placeholder='Enter degree' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="form__group">
                                <label htmlFor="startYear">Year of entering University</label>
                                <input type="text" name='joinYear' id='startYear' placeholder='Enter Year' className='flex-1' />
                            </div>
                            <div className="form__group">
                                <label htmlFor="graduationYear">Year of graduation</label>
                                <input type="text" name='graduationYear' id='graduationYear' placeholder='Enter graduation year' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="form__group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' placeholder='Enter password' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Re-enter password' className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <button className='main__btn mx-auto mt-2 signup__btn justify-center flex items-center gap-2'>
                            Register
                            {loading && <Loader/>}
                        </button>

                    </form>
                </section>
            </main>

            <Footer/>
            
        </>
    );
}

export default Registration;