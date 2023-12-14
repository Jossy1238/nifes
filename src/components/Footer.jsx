import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from '../utils/content';
import { subscribe } from '../apis';
import Loader from './Loader';

function Footer(props) {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({
        type: '',
        content: ''
    })

    const [loading, setLoading] = useState(false);

    const handleSubscribe = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const response = await subscribe({email});
            if(response){
                console.log(response);
                setMessage({
                    type: 'success',
                    content: 'You have successfully subscribed to our newsletter'
                })
            }       

        } catch (error) {
            console.log(error);  
            setMessage({
                type: 'error',
                content: 'An error occured, please try again'
            })          
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <footer className='pt-5 bg__main relative mt-5 px-5'>
            <div className='join__us w-4/5 px-5 py-2 rounded-md flex justify-between border'>
                <p>Join Us Now</p>
                <NavLink to='/signup' className={"opacity-full"}><button className='main__btn border'>Register</button></NavLink>
            </div>
            <div className='flex py-3 justify-between gap-2 footer__top'>
                <p className='text-2xl'>Nifes Alumni Community</p>
                <div>
                    <p className='text-lg uppercase'>Quick Links</p>
                    <ul className='mt-2 gap-1 flex flex-col'>                            
                        {
                            menuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <NavLink to={item.link} >{item.name}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-2 uppercase'>Zonal Contact</p>
                    <a href="mailto:info@nifesalumni.com" className='mb-1' >info@nifesalumni.com</a>
                    <a href="tel:+23480315949" >+23480315949</a>
                </div>
                <div>
                    <p className='uppercase'>Subscribe to our newsletter</p>
                    <p className='my-2'>Be the first to know about our upcoming event!</p>
                    {message.content && <p className={`${message.type === 'success' ? 'label__success' : 'label__error'} text-sm`}>{message.content}</p>}
                    <form onSubmit={handleSubscribe} className='flex gap-2 flex flex-col'>
                        <input type="email" name='email' placeholder='Email Address' className='p-1' onChange={(e)=>setEmail(e.target.value)} required />
                        
                        <button className='main__btn w-full signup__btn justify-center flex items-center gap-2'>
                            Subscribe
                            {loading && <Loader/>}
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer__line"></div>
            <div className='flex justify-between pt-2 pb-2'>
                <p className='text-sm opacity-5'>Copyright © 2022 Nifes | All Rights Reserved </p>
                <ul className='flex items-center gap-2'>
                    <li>
                        <a href=""><i className='fab fa-facebook opacity-5'></i></a>                                
                    </li>
                    <li>
                        <a href=""><i className='fab fa-twitter opacity-5'></i></a>
                    </li>
                    <li>
                        <a href=""><i className='fab fa-instagram opacity-5'></i></a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;