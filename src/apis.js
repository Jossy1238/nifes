import axios from 'axios'

export const API_URL = "https://nifes-backend.onrender.com";

axios.defaults.withCredentials = true;

export async function register(data){
    const url = `${API_URL}/users/`
    return axios.post(
            url, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                  },
            }
            )
            .then(response => response.data)
}

export async function login(data){
    const url = `${API_URL}/users/login`
    return axios.post(
            url, data,
            )
            .then(response => response.data)
}


export async function getCurrentUser(token){
    const url = `${API_URL}/users/me/${token}`
    return axios.get(
            url,
            )
            .then(response => response.data)
    
}

export async function getUser(id){
    const url = `${API_URL}/users/${id}`
    return axios.get(
            url,
            )
            .then(response => response.data)
}

export async function updateUser(data, id){
    const url = `${API_URL}/users/${id}`
    return axios.put(
            url, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                  },
            }
            )
            .then(response => response.data)
}

export async function getAllUsers(){
    const url = `${API_URL}/users`
    return axios.get(
            url,
            )
            .then(response => response.data)
}

export async function logout(){
    const url = `${API_URL}/users/logout`
    return axios.get(
            url,
            )
            .then(response => response.data)
}


export async function createEvent(data){
    const url = `${API_URL}/events`
    return axios.post(
            url, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                  },
            }
            )
            .then(response => response.data)
}


export async function getAllEvents(){
    const url = `${API_URL}/events`
    return axios.get(
            url,
            )
            .then(response => response.data)
}

export async function getMyEvents(userId){
    const url = `${API_URL}/events/my-events`
    return axios.post(
            url, {userId}
            )
            .then(response => response.data)
}


export async function getEvent(id){
    const url = `${API_URL}/events/${id}`
    return axios.get(
            url,
            )
            .then(response => response.data)
}

export async function getUpcomingEvents(){
    const url = `${API_URL}/events/upcoming`
    return axios.get(
            url,
            )
            .then(response => response.data)
}

export async function updateEvent(data, id){
    const url = `${API_URL}/events/${id}`
    return axios.put(
            url, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                  },
            }
            )
            .then(response => response.data)
}

export async function deleteEvent(id){
    const url = `${API_URL}/events/${id}`
    return axios.delete(
            url,
            )
            .then(response => response.data)

}


export async function subscribe(data){
    const url = `${API_URL}/subscribe`
    return axios.post(
            url, data,
            )
            .then(response => response.data)
}