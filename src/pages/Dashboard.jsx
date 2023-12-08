import React from 'react';
import AppWrapper from '../components/AppWrapper';
import { NavLink } from 'react-router-dom';

function Dashboard(props) {
  
    return (
        <AppWrapper title="Dashboard">
            <div className='h-full flex flex-col items-center pt-5'>
                <h2 className='text-5xl font-500'>Welcome Back!</h2>
                <p className='opacity-7 text-xl mt-1'>Navigate Side Bar for More Options!</p>
                <NavLink to="/my-events/create"><button className='main__btn mx-auto mt-2 signup__btn'>Create Event</button></NavLink>
            </div>
        </AppWrapper>
    );
}

export default Dashboard;