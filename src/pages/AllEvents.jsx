import React, { useContext, useEffect, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import AppContext from '../AppContext';
import { getAllEvents } from '../apis';
import Loader from '../components/Loader';

function AllEvents(props) {

    const {user} = useContext(AppContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        const getEvents = async()=>{
            try {
                setLoading(true);
                const response = await getAllEvents();
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

        getEvents();
    }, [])

    return (
        <AppWrapper title="Events">
            <section className='pt-3'>
                <div className='flex items-center justify-between'>
                    <div className='action__title'>
                        <h2 className='text-3xl font-500'>All Events</h2>
                        <p className='opacity-5 text-lg'>
                        Explore a world of exciting events, where memorable moments await you.
                        Discover and engage with a diverse range of activities that cater to your interests and passions. 

                            </p>
                    </div>
                    <NavLink to='/my-events/create'><button className='main__btn'>
                        <span>Create Event</span>
                        <i className='fas fa-plus'></i>
                        </button>
                    </NavLink>

                </div>
                <>
                    {loading?
                        <div className='table__loader pt-2 full-center'>
                            <Loader/>
                        </div>
                        :

                        <div className='flex mt-3 flex-wrap long__events gap-2 mb-5'>
                            {events.map((event, i)=>(
                                <EventCard key={i} event={event} isInApp={true}/>
                            ))}
                        </div>
                    }
                </>

            </section>            
        </AppWrapper>
    );
}

export default AllEvents;