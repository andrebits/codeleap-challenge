import axios from "axios";
import IUser from "../interfaces/IUser";
import { IPost } from "../interfaces/IPost";


const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(user: IUser) {
    
    return axios.post(`${BASE_API_URL}user/signup/`, {
        username: user.username, 
        password: user.password})
}

// Get All Posts
export async function getPosts() {
    return axios.get(`${BASE_API_URL}/`)
}

// Login 
export async function login(user: IUser) {
    return axios.post(`${BASE_API_URL}/token/`,
        {
        username: user.username,
        password: user.password,
        }
    )
}

// Registration 
export async function register(user: IUser) {
    return axios.post(`${BASE_API_URL}/user/signup/`,
        {
        username: user.username,
        password: user.password,
        }
    )
}

// Create post
export async function newPost(post: IPost) {
    return axios.post(`${BASE_API_URL}/`,
        {
        username: post.username, 
        title: post.title,
        content: post.content
        }
    )
}

// Delete post
export async function removePost(post: IPost) {
    return axios.delete(`${BASE_API_URL}/${post.id}/`)
}

// Edit post
export async function editPost(post: IPost) {
    return axios.patch(`${BASE_API_URL}/${post.id}/`,
        {
        title: post.title,
        content: post.content
        })
}