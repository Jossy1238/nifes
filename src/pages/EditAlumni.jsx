import React, { useEffect, useRef, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../apis';
import Loader from '../components/Loader';

function EditAlumni(props) {

    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const [message, setMessage] = useState({
        type: "",
        text: ""    
    });

    useEffect(()=>{
        const getAlumni = async()=>{
            try {
                setLoading(true);
                const response = await getUser(id);

                if(response){
                    setUser(response)
                }    
                
                else{
                    navigate("/signin")
                }
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoading(false)
            }
        }
        getAlumni();
    }, [])

    const [updating, setUpdating] = useState(false);
    const messageRef = useRef();

    const handleInputChange = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleUpdateUser = async(e)=>{
        e.preventDefault();
        setUpdating(true);
        try {
            const response = await updateUser(user, id);
            if(response){
                setMessage(
                    {
                        type: "success",
                        text: "User updated successfully"
                    }
                )
            }            
        } catch (error) {
            console.log(error)
            setMessage(
                {
                    type: "error",
                    text: error?.response?.data?.message
                }
            )
            messageRef.current.scrollIntoView({behavior: 'smooth'})
        }
        finally{
            setUpdating(false)
        }

    }


    return (
        <AppWrapper title="Alumni">
            <form onSubmit={handleUpdateUser} className='pt-3 create__event--form flex flex-col'>
                <div>
                    <h3 className='text-3xl font-500'>Edit Alumni</h3>
                    <p className='opacity-5 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, temporibus!</p>
                </div>

                {
                    loading?
                    <div className='blue__loader py-5 full-center'>
                        <Loader/>
                    </div>
                    :
                    <>            
                        {message.text && <div className={`border mt-2 w-full ${message.type=="error" ? "label__error":"label__success"}`}>{message.text}</div>}
        
                        <div className="flex gap-2 mt-2">
                            <div className="form__group">
                                <label htmlFor="name">Alumni Name</label>
                                <input type="text" name='name' id='name' placeholder='Enter Alumni Name' value={user.fullName} className='flex-1' onChange={handleInputChange} required/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' id='username' placeholder='Enter username' value={user.username} className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                            <div className="form__group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" name='phoneNumber' id='phoneNumber' placeholder='Enter phone number' value={user.phoneNumber} className='flex-1' onChange={handleInputChange}/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="country">Country of residence</label>
                                <input type="text" name='currentCountry' id='country' placeholder='Enter country' value={user.currentCountry} className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                            <div className="form__group">
                                <label htmlFor="major">Majors</label>
                                <input type="text" name='major' id='major' placeholder='Enter major' value={user.major} className='flex-1' onChange={handleInputChange} required/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="degree">Degree Obtained</label>
                                <input type="text" name='degree' id='degree' placeholder='Enter degree' value={user.degree} className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                            <div className="form__group">
                                <label htmlFor="startYear">Year of entering University</label>
                                <input type="text" name='joinYear' id='startYear' placeholder='Enter Year' value={user.joinYear} className='flex-1' onChange={handleInputChange}/>
                            </div>
                            <div className="form__group">
                                <label htmlFor="graduationYear">Year of graduation</label>
                                <input type="text" name='graduationYear' id='graduationYear' placeholder='Enter graduation year' value={user.graduationYear} className='flex-1' onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <button className='main__btn mx-auto mt-2 signup__btn justify-center flex items-center gap-2'>
                            Update
                            {updating && <Loader/>}
                        </button>
                    </>
                    
                }


            </form>
        </AppWrapper>
    );
}

export default EditAlumni;