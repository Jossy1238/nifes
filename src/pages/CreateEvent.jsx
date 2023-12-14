import React, { useContext, useRef, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import AppContext from '../AppContext';
import { createEvent } from '../apis';
import Loader from '../components/Loader';

function CreateEvent(props) {

    const {user} = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: ""    
    });

    const [formFields, setFormFields] = useState({});

    function handleInputChange(e){
        setFormFields({...formFields, [e.target.name]: e.target.value})
    }

    const handleChangeImage = (e)=>{
        setFormFields({...formFields, image: e.target.files[0]})
    }

    const messageRef = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);

        console.log("FIELDS", formFields)

        try {
            const response = await createEvent({...formFields, createdBy:user._id});
            if(response){
                setMessage(
                    {
                        type: "success",
                        text: response.message
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
            setLoading(false)
        }
    }



    return (
        <AppWrapper title="Events">
            <form onSubmit={handleSubmit} className='pt-3 create__event--form flex flex-col'>
                <div className=''>
                    <h3 className='text-3xl font-500'>Create Event</h3>
                    <p className='opacity-5 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, temporibus!</p>
                </div>
                {message.text && <div className={`border mt-2 w-full ${message.type=="error" ? "label__error":"label__success"}`}>{message.text}</div>}

                <div className="flex gap-2 mt-2 form__row">
                    <div className="form__group">
                        <label htmlFor="eventName">Event Name</label>
                        <input type="text" name='name' id='eventName' placeholder='Enter Event Name' className='flex-1'  onChange={handleInputChange} required/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" onChange={handleInputChange} required>
                            <option value="">Select Category</option>
                            <option value="networking">Networking</option>
                            <option value="campus events">Campus events</option>
                            <option value="professional development">Professional development</option>

                        </select>
                    </div>
                </div>
                <div className="flex gap-2 mt-2 form__row">
                    <div className="form__group">
                        <label htmlFor="date">Date</label>
                        <input type="date" name='date' id='date' placeholder='Enter Date' className='flex-1'  onChange={handleInputChange} required/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="venue">Venue</label>
                        <input type="text" name='venue' id='venue' placeholder='Enter Venue' className='flex-1'  onChange={handleInputChange} required/>
                    </div>
                </div>
                <div className="flex gap-2 mt-2 form__row">
                    <div className="form__group">
                        <label htmlFor="date">Time</label>
                        <input type="time" name='time' id='time' placeholder='Enter Date' className='flex-1'  onChange={handleInputChange} required/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="venue">Speakers</label>
                        <input type="text" name='speakers' id='speakers' placeholder='Enter the number of speakers' className='flex-1'  onChange={handleInputChange} required/>
                    </div>
                </div>
                <div className="form__group mt-2">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" placeholder='Description' onChange={handleInputChange} required>
                    </textarea>
                </div>
                <div className="form__group mt-2">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={handleChangeImage} required/>
                </div>
                <button className='main__btn mx-auto mt-2 signup__btn justify-center flex items-center gap-2'>
                    Create
                    {loading && <Loader/>}
                </button>

            </form>            
        </AppWrapper>
    );
}

export default CreateEvent;