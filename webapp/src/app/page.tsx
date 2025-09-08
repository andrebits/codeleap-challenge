"use client";

import { useEffect, useState } from "react";
import SignInSignUpModal from "./components/SignInSingUpModal";
import Modal from "./components/Modal";
import Post from "./components/Post";
import { IPost } from "./interfaces/IPost";
import DeleteModal from "./components/DeleteModal";
import Create from "./components/Create";
import EditModal from "./components/EditModal";
import { getPosts, newPost, removePost } from "./api/api";
import Link from "next/link";

export default function Home() {

  // Login
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(true);

  // User
  const [username, setUsername] = useState<string | null>(null);

  // Delete
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null)
  
  // Edit
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [postEdited, setPostEdited] = useState<IPost | null>(null)

  // Post List
  const [postList, setPostList] = useState<IPost[]>([]);

  function loadPosts(): void{
    getPosts().then((response)=>{
      setPostList(response.data)
    })
  }

  useEffect(()=>{
   loadPosts();
   setUsername(localStorage.getItem("username"))  
  },[loginModalIsOpen]);
  
  useEffect(()=>{
    if(username) { 
      setLoginModalIsOpen(false);
    } else{
      setLoginModalIsOpen(true);
    }
  },[username]);

  // ------------------ Logout ------------------
  function handleLogoutClick(){
    localStorage.removeItem("username");
    setUsername(null)
  }

  // ------------------ Create ------------------
  async function createPost(title: string, content: string){
    try{
      const post:IPost = {
        username: localStorage.getItem("username")!,
        title: title,
        content: content,
      }
      await newPost(post); 
      loadPosts(); 

    }catch(error){
      console.log("error: ", error);
    }
  }

  // ------------------ Delete ------------------
  function openDeletionModal(post:IPost){
    setDeleteModalIsOpen(true);
    setPostToDelete(post);
  }

  async function confirmDeletePost() {
    if (!postToDelete) return;
    await removePost(postToDelete);
    loadPosts();
    setDeleteModalIsOpen(false);
    setPostToDelete(null);
  }

  // ------------------ Edit ------------------
  function openEditModal(post:IPost){
    setEditModalIsOpen(true);
    setPostEdited(post);
  }

  function saveEdited(updatedPost: IPost){
    if(!updatedPost) return;
    setPostList((prevList) => 
      prevList.map((post) => 
      post.id === updatedPost.id ? updatedPost : post  
    ));
    setEditModalIsOpen(false);
    setPostEdited(null);
  }

  return (
    <div className="w-3/4 min-h-screen overflow-y-auto bg-white mx-auto">
      <div className=" bg-indigo-400 text-white p-5 pb-0">
        <p  className="text-end text-md italic p-0 m-0 h-1 text-sm text-stone-50 hover:text-stone-300 "><Link href="#" onClick={handleLogoutClick}>Logout</Link></p>
        <h1 className="text-2xl font-bold">CodeLeap Network</h1>
        {username && (<p className="text-end text-md italic">Hello, <span className="font-bold">{username}</span>. 
         </p>)}
      </div>
      
      <div className="w-3.5/4 border rounded-xl p-5 border border-black-500 m-5">
        <Create header={`What's on your mind?`} createPost={createPost} />
      </div>

      {/* rendering posts  */}

      {postList.length === 0 ? <p className="text-center">There is no content. Post something!</p> : postList.map((post) => (
        <Post
          key={post.id}
          post={post}
          setDeleteModalIsOpen={() => openDeletionModal(post)}
          setEditModalIsOpen={() => openEditModal(post)}
        />
      ))}

      {/* Login */}
      <Modal
        isOpen={loginModalIsOpen}
        setIsOpen={setLoginModalIsOpen}
        title="Welcome to CodeLeap network!"
        content={<SignInSignUpModal setIsOpen={setLoginModalIsOpen} />}
      />

      {/* Delete */}
      <Modal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        title="Are you sure you want delete this item?"
        content={<DeleteModal
                  setIsOpen={setDeleteModalIsOpen}
                  confirmDeletePost={confirmDeletePost}
                />}
      />

      {/* Edit */}
      <Modal
        isOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
        title="Edit item"
        content={<EditModal
                  post={postEdited!}
                  setEditModalIsOpen={setEditModalIsOpen}
                  setIsOpen={openEditModal}
                  saveEdited={saveEdited}
                />}
      />
    </div>
  );
}
