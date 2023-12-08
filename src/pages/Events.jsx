import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUpcomingEvents } from '../apis';
import Loader from '../components/Loader';

function Events(props) {

    const navigate = useNavigate();

    const [loadingUpcoming, setLoadingUpcoming] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(()=>{
        const getAllUpcomingEvents = async()=>{
            try {
                setLoadingUpcoming(true);
                const response = await getUpcomingEvents();
                if(response.events){
                    console.log(response.events)
                    setUpcomingEvents(response.events)
                }  
                
            } catch (error) {
                console.log(error)                                
            }
            finally{
                setLoadingUpcoming(false)
            }
        }

        getAllUpcomingEvents();
    }, [])

    return (
        <>
            <Header/>
            <main className='top__padding'>
                <section className='bg__main p-5'>
                    <h1 className='text-5xl font-600'>Upcoming Events</h1>
                </section>
                <section className='py-5'>
                    {
                        loadingUpcoming?
                        <div className='full-center mx-auto w-1/2 py-5'>
                            <Loader/>
                        </div>
                        :  

                        <>
                            <div className='flex flex-wrap long__events justify-center gap-2 px-5 mb-5'>
                                {upcomingEvents.map((event, i)=>(
                                    <EventCard key={i} event={event}/>
                                ))}
                            </div>
                            {upcomingEvents.length > 9 &&
                            <div className='mt-2 flex justify-center w-full px-5 items-center'>
                                <NavLink to={`'/about'`}><button className='main__btn'>View More</button></NavLink>
                            </div>}                        
                        </>
                    }
                </section>

            </main>
            <Footer/>
            
        </>
    );
}

export default Events;