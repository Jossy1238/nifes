import React, { useContext, useEffect, useState } from 'react';
import AppWrapper from '../components/AppWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../apis';
import Loader from '../components/Loader';
import AppContext from '../AppContext';

function Alumni(props) {

    const {user} = useContext(AppContext);
    const uId = user?._id;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);


    useEffect(()=>{
        const getUsers = async()=>{
            try {
                setLoading(true);
                const response = await getAllUsers();

                if(response){
                    console.log(response)
                    setUsers(response)
                }  
                
            } catch (error) {
                console.log(error)                
            }
            finally{
                setLoading(false)
            }

        }

        getUsers();
    }, [])


    return (
        <AppWrapper title="Alumni">
            <section className='pt-3 w-full section__alumnis'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-500'>All Alumni</h2>
                        <p className='opacity-5 text-lg'>The complete record of Registered Nifes Alumni</p>
                    </div>
                    <NavLink to='/alumni/add'><button className='main__btn'>                        
                        <span>Add Alumni</span>
                        <i className='fas fa-plus'></i>
                    </button></NavLink>
                </div>
                <div className='custom__table--container'>
                    <div className='custom__table mt-2'>
                        <div className="table__head">
                            <div className="table__head-item">Name</div>
                            <div className="table__head-item">Email</div>
                            <div className="table__head-item">Username</div>
                            <div className="table__head-item">Degree</div>
                            <div className="table__head-item">Year of Graduation</div>
                            <div className="table__head-item">Actions</div>
                        </div>
                        <div className=''>
                            {
                                loading ?
                                <div className='blue__loader py-5 full-center'>
                                    <Loader/>
                                </div>

                                :

                                users.map((user, i)=>(
                                    <div className="table__row" key={i}>
                                        <div className="table__row-item">{user.fullName}</div>
                                        <div className="table__row-item">
                                            <a href={`mailto:${user.email}`} target="_blank">{user.email}</a>
                                        </div>
                                        <div className="table__row-item">{user.username}</div>
                                        <div className="table__row-item">{user.degree}</div>
                                        <div className="table__row-item">{user.graduationYear}</div>
                                        <div className="table__row-item">
                                            <NavLink to={`/alumni/${user._id}/edit`}>
                                                <button className='main__btn action__btn mr-1'>
                                                    <i className='fas fa-edit'></i>
                                                </button>
                                            </NavLink>
                                            {user._id !== uId &&
                                            <button className='main__btn action__btn'>
                                                <i className='fas fa-trash'></i>
                                            </button>}
                                        </div>
                                    </div>
                                ))

                            }

                        </div>
                    

                    </div>
                </div>
            </section> 
            
        </AppWrapper>
    );
}

export default Alumni;