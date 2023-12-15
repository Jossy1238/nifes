import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Faq from '../components/Faq';
import Header from '../components/Header';
import { questions } from '../utils/content';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getUpcomingEvents } from '../apis';
import Loader from '../components/Loader';

function Home(props) {

    const [isAnswer, setIsAnswer] = useState({
        questionOne:false,
        questionTwo:false,
        questionThree:false,
        questionFour:false
      })

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
  
      const whyArray = [
        {
            title:"Effective Connection",
            description:"Nifes is where many of us formed lasting friendships and bonds that continue to enrich our lives. The connections made during our time at Nifes are often some of the strongest and most enduring."

        },
        {
            title:"Engagement",
            description:"Nifes Alumni Community gives a sense of belonging and a place to call home. It's where we learned, grew, and became the individuals we are today via engaging on different event."
        },
        {
            title:"Collaboration",
            description:"Nifes has always stood for more than just an educational institution. It's a place where collaboration thrives, and it plays a pivotal role in our Nifes experience. Here's why collaboration at Nifes is so essential"
        },
        {
            title:"Education",
            description:"Nifes Alumni community offers a platform for personal and professional development, allowing us to explore our passions and potential."
        }
      ]

      const testimonials = [
        {
            name:'Jossy Nation',
            role:'Alumni Member',
            content:'Joining the Nifes Community web family has been a fantastic experience! It is like finding a digital home where I can connect with fellow alumni, stay updated on news and events, and be part of a vibrant online community. Nifes Community has made it easy for me to stay engaged and connected, and I am excited to be a part of this wonderful online family.',
            image:'/woman.jpg'
        },
        {
            name:'Nosa Julius',
            role:'Alumni Member',
            content:'Joining the Nifes Community web family has been an incredible journey! It is like finding a digital home filled with welcoming faces and shared memories. This online community has reconnected me with old friends and allowed me to make new ones, all while staying updated on the latest Nifes news and events. Nifes Community web platform has made me feel a part of something special, and Iam thrilled to be a member of this thriving online family.',
            image:'/men.png'
        },
      ]


    

    return (
        <>
            <Header/>
            <main>
                <section className="hero bg__main h-screen flex justify-between px-5 gap-5 items-center">
                    <div className="hero__content w-3/5">
                        <h1 className="hero__title text-5xl font-600 w-1/2">Welcome To Nifes Alumni Commnuity</h1>
                        <p className="hero__description py-3 w-3/4">Welcome to the Nifes Alumni Community! Here, we celebrate our shared Nifes experience and look forward to connecting, reminiscing, and making a brighter future together. Welcome home!</p>
                        <NavLink to='/signup'><button className='main__btn'>Register Now</button></NavLink>
                    </div>
                    <div className='flex-1 hero__img relative'>
                        <img src="/hero.png" alt="" />
                    </div>
                </section>
                <section className='flex px-5 gap-5 py-5 justify-between items-center why__section'>
                    <div className='flex-1 why__left'>
                        <h3 className="section__title">Why Nifes</h3>
                        <p className='mb-3 w-3/4'>
                        Because it's more than just a Alumni; it's a community, a source of learning, and a cherished chapter in our lives that continues to shape our present and future!
                        </p>
                        <NavLink to='/about'><button className='main__btn'>Know More</button></NavLink>
                    </div>
                    <div className='w-3/5 flex flex-wrap justify-between gap-3'>
                        {whyArray.map((why, i)=>(
                            <div className={`why__box--repeated bg-white p-2 shadow-5 border-top-${i+1}`}>
                                <img src={`why${i+1}.svg`} alt="" className='why__icon' />
                                <h5 className='mt-1 mb-2'>{why.title}</h5>
                                <p className=''>{why.description}</p>
                            </div>
                        ))

                        }
                    </div>
                </section>
                <section className='flex flex-col items-center'>
                    <h3 className="section__title text-center">Upcoming Event</h3>
                    {
                        loadingUpcoming?
                        <div className='full-center mx-auto w-1/2 py-5'>
                            <Loader/>
                        </div>
                        :  

                        <>
                            <div className='flex home__cards w-full flex-wrap justify-center gap-3 px-5'>
                                {upcomingEvents.map((event, i)=>(
                                    <EventCard key={i} event={event}/>
                                ))}
                            </div>
                            {upcomingEvents.length > 3 &&
                            <div className='text-right mt-2 flex justify-end w-full px-5 items-center'>
                                <NavLink to='/events'>View All Events&nbsp;<i className='fas fa-arrow-right'></i> </NavLink>
                            </div>   }                     
                        </>
                    }
                    
                </section>
                <section className='flex flex-col items-center py-5'>
                    <h3 className="section__title text-center">FAQ</h3>
                    <div className='flex flex-col gap-2'>
                        {
                            Object.entries(questions).map(([key, value], i)=>(
                                <Faq isAnswer={isAnswer} question={key} setIsAnswer={setIsAnswer} questionsAndAnswers = {value}/>
                            ))
                        }
                    </div>

                </section>
                <section className='flex flex-col items-center py-5'>
                    <h3 className="section__title text-center">Alumni Testimonial</h3>
                    <div className='flex flex-wrap justify-center gap-5 mt-3'>
                        {testimonials.map((testimonial, i)=>(
                            <div className='testimonial__repeated bg-white py-2 px-2 text-center w-1/3 flex flex-col items-center'>
                                <img src={testimonial.image} alt="" className="alumni__rounded cover rounded-full" />
                                <div className='my-1'>
                                    <h5 className='text-xl font-600'>{testimonial.name}</h5>
                                    <div>{testimonial.role}</div>
                                </div>
                                <p>
                                    {testimonial.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer/>

            </main>
        
        </>
    );
}

export default Home;