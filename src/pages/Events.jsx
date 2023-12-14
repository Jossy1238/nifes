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

    const [eventsToShow, setEventsToShow] = useState([]);

    useEffect(()=>{
        const getAllUpcomingEvents = async()=>{
            try {
                setLoadingUpcoming(true);
                const response = await getUpcomingEvents();
                if(response.events){
                    console.log(response.events)
                    setUpcomingEvents(response.events)
                    setEventsToShow(response.events)
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

    

    const [currentFilter, setCurrentFilter] = useState("All");
    
    const changeFilter = (filter)=>{
        setCurrentFilter(filter);
        const lowerFilter = filter.toLowerCase();

        if(filter === "All"){
            setEventsToShow(upcomingEvents);
            return;
        }

        else{
            const filteredEvents = upcomingEvents.filter((event)=>event.category.includes(lowerFilter));
            setEventsToShow(filteredEvents);
        }
    }

    const filters = ['Campus Events', 'Professional Development', 'Networking']

    return (
        <>
            <Header/>
            <main className='top__padding'>
                <section className='bg__main p-5'>
                    <h1 className='text-5xl font-600'>Upcoming Events</h1>
                </section>
                <section className='pb-5 pt-2'>
                    {
                        loadingUpcoming?
                        <div className='full-center mx-auto w-1/2 py-5 mb-2'>
                            <Loader/>
                        </div>
                        :  

                        <>
                            <div className='flex gap-2 items-center px-5 mb-2'>
                                <div onClick={()=>changeFilter("All")} className={`filter ${currentFilter === "All" && "active"} cursor-pointer px-1`}>ALL</div>
                                {filters.map((filter, i)=><div onClick={()=>changeFilter(filter)} key={i} className={`filter cursor-pointer ${currentFilter === filter && "active"} px-1`}>{filter}</div>)}

                            </div>
                            <div className='flex flex-wrap long__events justify-center gap-2 px-5 mb-5'>
                                {eventsToShow.map((event, i)=>(
                                    <EventCard key={i} event={event}/>
                                ))}
                            </div>
                            {eventsToShow.length > 9 &&
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