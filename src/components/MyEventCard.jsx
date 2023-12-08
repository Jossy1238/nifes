import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL, deleteEvent } from '../apis';
import Loader from './Loader';

function MyEventCard({event}) {
    const navigate = useNavigate();

    const [deleting, setDeleting] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleDeleteEvent = async(id)=>{
        setCurrentId(id)
        try {
            const response = await deleteEvent(event._id);
            if(response){
                console.log(response)
                window.location.reload();
            }
            
        } catch (error) {
            console.log(error)                        
        }
        finally{
            setDeleting(false)
        }
    }

    return (
        <div className='event__card bg-white w-3/10 rounded-lg shadow-2 p-2 flex flex-col'>
            <img src={`${API_URL}/images/${event.image}`} alt="" className='event__img' />
            <div className='event__details flex flex-col'>
                <div className='mt-1 mb-1 font-600'>#{event.category}</div>
                <p className=''>{event.name}</p>
                <div className='my-1 opacity-5'>{new Date(event.date).toDateString()}</div>
                <div className='flex justify-between items-center mt-1'>
                    <i onClick={()=>navigate(`/my-events/${event._id}/edit`)} className='fas fa-edit text-xl cursor-pointer text-blue'></i>
                    {
                        deleting &&  currentId === event._id ?
                        <Loader/>
                        :
                        <i onClick={()=>handleDeleteEvent(event._id)} className='fas fa-trash text-xl cursor-pointer text-red'></i>

                    }
                </div>
            </div>
        </div>
    );
}

export default MyEventCard;