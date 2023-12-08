import React, { useContext, useEffect, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import { deleteEvent, getMyEvents } from '../apis';
import Loader from '../components/Loader';
import EventCard from '../components/EventCard';
import MyEventCard from '../components/MyEventCard';

function MyEvents(props) {

    const {user} = useContext(AppContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        const getAllMyEvents = async()=>{
            try {
                setLoading(true);
                console.log(user._id)
                const response = await getMyEvents(user._id);
                if(response.events){
                    console.log(response.events)
                    setEvents(response.events)
                }  
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoading(false)
            }

        }
        getAllMyEvents();
    }, [user])

    return (
        <AppWrapper title="My Events">
            <section className='pt-3'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-500'>My Events</h2>
                        <p className='opacity-5 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eligendi?</p>
                    </div>
                    <NavLink to='/my-events/create'><button className='main__btn'>Create Event</button></NavLink>
                </div>
                <>
                    {loading?
                        <div className='table__loader pt-2 full-center'>
                            <Loader/>
                        </div>
                        :

                        <div className='flex mt-3 flex-wrap long__events gap-2 mb-5'>
                            {events.map((event, i)=>(
                                <MyEventCard key={i} event={event}/>
                            ))}
                        </div>
                    }
                </>
            </section>
            
        </AppWrapper>
    );
}

export default MyEvents;