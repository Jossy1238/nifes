import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About(props) {

    const NifesTeam = [
        {
            name:'Johnny DRILLE',
            role:'Chairperson',
            image:'/another man.jpg'
        },
        {
            name:'Oyemwen LAW',
            role:'Vice Chairperson',
            image:'/Jossy Nation Photograph.png'
        },
        {
            name:'Nest BRICKS',
            role:'Secretary',
            image:'/newwoman.png'
        },
      ]

    return (
        <>
            <Header/>
            <main>
                <section className="hero bg__main about__hero flex justify-between px-5 gap-5 items-center">
                    <div className="hero__content w-3/5">
                        <h1 className="hero__title text-5xl font-600 w-1/2">This is About Us!</h1>
                        {/* <p>A Community with LOVE!!!</p> */}
                        <h2>A Community with LOVE!!!</h2>
                        <p className="hero__description py-3 w-3/4">The Nifes Alumni Community was founded on a bright and sunny day in June 1985. It all began with a handful of dedicated Nifes alumni who shared a vision of creating a strong and connected network. Over the years, this community has grown, evolved, and thrived, uniting alumni from diverse backgrounds and generations. Today, we stand as a testament!</p>
                    </div>
                    <div className='hero__img relative'>
                        <img src="/hero.png" alt="" />
                    </div>
                </section>
                <section className="p-5 flex flex-col gap-2">
                    <div className="flex about__mission items-center gap-5 px-5">
                        <img src="/mission.png" alt="" className='w-1/2' />
                        <p className='w-1/2'>
                        "Nifes Alumni' mission is to empower its community through lifelong learning, engaging campus events, and fostering valuable connections. We are committed to the continuous professional development of our members, creating memorable campus experiences, and providing a thriving network for meaningful networking and support."
                        </p>
                    </div>
                    <div className="flex vision__sec about__mission flex-row-reverse items-center gap-5 px-5">
                        <img src="/vision.png" alt="" className='w-1/2' />
                        <p className='flex-1'>
                        Our vision is to create a global community of Nifes alumni where the pursuit of excellence is a shared journey, where connections are meaningful and enduring, and where together, we shape a future that embodies the values and aspirations of our beloved institution. We envision an ever-growing tapestry of success stories, shared memories, and a spirit of unity that transcends time and boundaries, ultimately leaving a positive and lasting impact on individuals, communities, and the world at large."                        </p>
                    </div>
                </section>

                <section className='p-5 flex flex-col items-center'>
                    <h3 className="section__title text-center">Core Values</h3>
                    <div className='flex flex-wrap rounded-md bg-white pt-3 justify-between core__values w-1/2'>
                        {new Array(4).fill(0).map((_, i)=>(
                            <div className='w-1/2 flex flex-col items-center gap-1 mb-3'>
                                <i className='fas fa-flag text-5xl text__gradient'></i>
                                <p>Commitment</p>
                            </div>
                        ))
                        }
                    </div>

                </section>
                
                <section className='p-5 achievement__sec flex items-center gap-3 justify-between'>
                    <img src="/achievement.png" alt="" className='w-1/3' />
                    <div className='w-1/2'>
                        <h3 className="section__title">Achievement</h3>
                        <p>Our alumni community boasts a track record of remarkable achievements, with members excelling in various professional fields, making scholarly contributions, giving back through philanthropy, assuming leadership roles, launching successful entrepreneurial ventures, and actively mentoring the next generation. Together, we inspire success and positive change, embodying the core values instilled by Nifes.</p>
                    </div>
                </section>

                <section className='p-5 flex flex-col items-center gap-3 justify-between'>
                    <h3 className="section__title text-center">Meet Alumni Executives</h3>
                    <div className='flex  items-center gap-2 meet__execs'>
                        {NifesTeam.map((NifesTeam, i)=>(
                            <div className='flex bg-white rounded-md overflow-hidden flex-col exec__repeated'>
                                <img src={NifesTeam.image} alt="" className='cover' />
                                <p className='px-1 mt-1 text-xl'>{NifesTeam.name}</p>
                                <p className='px-1 mb-1 oapcity-7'>{NifesTeam.role}</p>                                
                            </div>
                        ))

                        }

                    </div>
                </section>

            </main>
            <Footer/>
            
        </>
    );
}

export default About;