import React from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from '../utils/content';

function Header(props) {
    return (
        <header className='fixed text-white w-full px-5 flex items-center justify-between'>
            <NavLink to="/" className="text-xl font-700">Nifes Alumni</NavLink>
            <nav className='flex-1 flex items-center justify-between'>
                <ul className='mx-auto flex gap-2'>
                    {menuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        )
                    })}
                </ul>
                <div className='flex gap-1 items-center'>
                    <NavLink to="/signin"><button className=''>Sign in</button></NavLink>  
                    <NavLink to="/signup"><button className='main__btn'>Sign up</button></NavLink>  
                </div>
            </nav>
        </header>
    );
}

export default Header;