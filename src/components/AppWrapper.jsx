import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import { API_URL, getCurrentUser, logout } from '../apis';
import Loader from './Loader';

function AppWrapper({title, children}) {

    const {user, setUser} = useContext(AppContext);

    const sidebarItems = [
        {
            name: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Events',
            link: '/all-events'
        },
        {
            name: 'My Events',
            link: '/my-events'
        },
        
    ]

    const adminItems = [
        ...sidebarItems,
        {
            name: 'Alumni',
            link: '/alumni'
        },
    ]

    const [menuItems, setMenuItems] = useState(sidebarItems);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem("nifes__token");
        if(!token){
            navigate("/signin")
            return;
        }

        const getUser = async()=>{
            try {
                setLoading(true);
                const response = await getCurrentUser(token);
                if(response.data.user){
                    console.log(response.data.user)
                    setUser(response.data.user)
                    if(response.data.user.role === "admin"){
                        setMenuItems(adminItems);
                    }
                }    
                
                else{
                    navigate("/signin")
                }
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoading(false)
            }
        }
        getUser();
    }, [])

    const handleLogout = async()=>{
        localStorage.removeItem("nifes__token");
        setUser(null);
        await logout();
        navigate("/signin")
    }



    return (
        <div className='flex h-screen main__app'>
            {loading ?

                <div className='w-full h-full full-center border main__app--loader'>
                    <Loader/>
                </div>

            :

            <>
                <div className='w-1/5 px-2 py-1 bg__main flex flex-col'>
                    <NavLink to="/" className="text-white text-xl font-600"><h5 className=''>Nifes Alumni</h5></NavLink>
                    <div className='flex flex-col py-5 justify-between flex-1'>
                        <nav className=''>
                            <ul className='flex flex-col gap-1'>
                                {menuItems.map((item, index) => {
                                    return (
                                        <li key={index} className='w-full flex'>
                                            <NavLink to={item.link} className="sidebar__item" >{item.name}</NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                        <div className='flex'>
                            <button className='main__btn logout__btn mx-auto' onClick={handleLogout}>Logout</button>
                        </div>

                    </div>
                </div>
                <div className='flex-1'>
                    <header className='bg__main shadow-1 flex items-center justify-between px-5'>
                        <h1 className='uppercase text-3xl font-500'>{title}</h1>
                        <div className='flex items-center gap-2'>
                            <span>@{user?.username}</span>
                            <NavLink className="profile__img overflow-hidden rounded-full">
                                <img src={`${API_URL}/images/${user?.image}`} alt="" className='h-full cover' />
                            </NavLink>
                        </div>
                    </header>
                    <main className='border px-5 pb-2'>
                        {children}
                    </main>
                </div>            
            </>
            }

            
        </div>
    );
}

export default AppWrapper;