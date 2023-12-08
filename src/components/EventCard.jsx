import React from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../apis';

function EventCard({event, isInApp}) {

    const linkPrefix = isInApp ? "all-events" : "events"

    return (
        <div className='event__card bg-white w-3/10 rounded-lg shadow-2 p-2 flex flex-col'>
            <img src={`${API_URL}/images/${event.image}`} alt="" className='event__img' />
            <div className='event__details flex flex-col'>
                <div className='mt-1 mb-1 font-600'>#{event.category}</div>
                <p className=''>{event.name}</p>
                <div className='my-1 opacity-5'>{new Date(event.date).toDateString()}</div>
                <NavLink to={`/${linkPrefix}/${event._id}`}><button className='main__btn'>Read More</button></NavLink>
            </div>
        </div>
    );
}

export default EventCard;