import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getEvent } from '../apis';
import Loader from '../components/Loader';

function ViewEvent(props) {

    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    
    useEffect(()=>{
        const fetchEvent = async()=>{
            try {
                setLoading(true);
                const response = await getEvent(id);
                if(response.event){
                    console.log(response.event)
                    setEvent(response.event)
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


    return (
        <>
            <Header/>
            <main className='top__padding'>
                <section className='bg__main p-5'>
                    <h1 className='text-5xl font-600'>Upcoming Event</h1>
                </section>

                {
                loading ?
                    <div>
                        <Loader/>
                    </div>
                    :
                    <section className='p-5 flex flex-col items-center'>
                        <div onClick={()=>navigate(-1)} className='w-3/4 mb-2 cursor-pointer'><i className='fas fa-arrow-left'></i>&nbsp;&nbsp;Back</div>
                        <div className='w-3/4'>
                            <img src={`${API_URL}/images/${event.image}`} alt="" />
                        </div>
                        <div className='w-3/4 flex flex-col mt-1'>
                            <div className='uppercase opacity-5'>#{event.category}</div>
                            <h2 className='text-3xl font-600'>{event.name}</h2>
                            <p className='opacity-7 my-2'>
                                {event.description}
                            </p>
                            <div className='flex items-center mb-1'>
                                <span className='detail__label'>Date</span>
                                <span>{new Date(event?.date).toDateString()}</span>
                            </div>
                            <div className='flex items-center mb-1'>
                                <span className='detail__label'>Time</span>
                                <span>{event.time || "Not specified"}</span>
                            </div>
                            <div className='flex items-center'>
                                <span className='detail__label'>Speakers</span>
                                <span>{event.speakers || "N/A" }</span>
                            </div>
                        </div>
                    </section>
                }
            </main>
            <Footer/>
            
        </>
    );
}

export default ViewEvent;