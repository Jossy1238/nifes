import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact(props) {


    const handleFormSubmit = async()=>{

    }


    return (
        <>
            <Header/>
            <main className='top__padding contact__us'>
                <section className="p-5 flex items-center contact__us">
                    <div className='flex flex-col w-2/5'>
                        <img src="/contact.png" alt="" />
                        <h1 className='text-5xl font-500'>Contact Us</h1>
                        <p>For any inquiries or assistance, please don't hesitate to contact us, We are here to help!</p>
                        <div className='flex flex-col mt-2'>
                            <a href="mailto:info@nifesalumni.com" className='mb-1' >info@nifesalumni.com</a>
                            <a href="tel:+23480315949" >+23480315949</a>
                        </div>
                    </div>
                    <form action="https://formsubmit.co/pkishinyambwe@gmail.com" method='POST' className='flex-1 flex flex-col px-5 gap-2'>
                        <div className="flex gap-2 form__row">
                            <input type="text" name='Full name' placeholder='Full Name' className='flex-1' />
                            <input type="email" name='Email' placeholder='Email' className='flex-1' />
                        </div>
                        <input type="text" name='Topic' placeholder='Topic' />
                        <textarea name="message" id="" cols="30" rows="10" placeholder='Write your message'></textarea>
                        <button className='main__btn'>Send Message</button>
                    </form>

                </section>
            </main>
            <Footer/>
            
        </>
    );
}

export default Contact;