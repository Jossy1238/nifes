import React, { useEffect, useRef, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import { useParams } from 'react-router-dom';
import { getEvent, updateEvent } from '../apis';
import Loader from '../components/Loader';

function EditEvent(props) {

    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [formFields, setFormFields] = useState({});

    useEffect(()=>{
        const fetchEvent = async()=>{
            try {
                setLoading(true);
                const response = await getEvent(id);
                if(response.event){
                    console.log(response.event)
                    setEvent(response.event)
                    setFormFields(response.event)
                }  
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoading(false)
            }

        }
        fetchEvent();

    }, [])

    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: ""    
    });


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
            const response = await updateEvent(formFields, id);
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
        <AppWrapper title="Event">
            {
                loading ?
                <div>
                    <Loader/>
                </div>
                :
                <form onSubmit={handleSubmit} className='pt-3 create__event--form flex flex-col'>
                    <div className=''>
                        <h3 className='text-3xl font-500'>Edit Event</h3>
                        <p className='opacity-5 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, temporibus!</p>
                    </div>
                    {message.text && <div className={`border mt-2 w-full ${message.type=="error" ? "label__error":"label__success"}`}>{message.text}</div>}

                    <div className="flex gap-2 mt-2 form__row">
                        <div className="form__group">
                            <label htmlFor="eventName">Event Name</label>
                            <input type="text" name='name' id='eventName' placeholder='Enter Event Name' value={formFields.name} className='flex-1'  onChange={handleInputChange} required/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category" onChange={handleInputChange} required>
                                <option value="">Select Category</option>
                                <option value="networking" selected={formFields.category === "networking"}>Networking</option>
                                <option value="campus events" selected={formFields.category === "campus events"}>Campus events</option>
                                <option value="professional development" selected={formFields.category === "professional development"}>Professional development</option>

                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-2 form__row">
                        <div className="form__group">
                            <label htmlFor="date">Date</label>
                            <input type="date" name='date' id='date' placeholder='Enter Date' value={formFields.date?.split("T")[0]} className='flex-1'  onChange={handleInputChange} required/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="venue">Venue</label>
                            <input type="text" name='venue' id='venue' placeholder='Enter Venue' value={formFields.venue} className='flex-1'  onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className="form__group mt-2">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="10" placeholder='Description' value={formFields.description} onChange={handleInputChange} required>
                        </textarea>
                    </div>
                    <div className="form__group mt-2">
                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" id="image" onChange={handleChangeImage}/>
                    </div>
                    <button className='main__btn mx-auto mt-2 signup__btn justify-center flex items-center gap-2'>
                        Update
                        {updating && <Loader/>}
                    </button>

                </form>            

            }
        </AppWrapper>
    );
}

export default EditEvent;