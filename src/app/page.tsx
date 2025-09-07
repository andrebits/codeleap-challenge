"use client";

import { use, useEffect, useState } from "react";
import GetUsernameModal from "./components/GetUsernameModal";
import Modal from "./components/Modal";
import Form from "./components/Create";
import Post from "./components/Post";
import { IPost } from "./interfaces/IPost";
import DeleteModal from "./components/DeleteModal";
import Create from "./components/Create";
import EditModal from "./components/EditModal";
import ButtonSuper from "./components/button-super";

export default function Home() {

  // Username
  const [getUsernameModalIsOpen, setGetUsernameModalIsOpen] = useState(false);

  // Delete
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null)
  
  // Edit
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [postEdited, setPostEdited] = useState<IPost | null>(null)

  // Post List
  const [postList, setPostList] = useState<IPost[]>([]);
  
  const now = new Date();
  const minutes: number = 10;

  const post1: IPost = {
    id: "1",
    username: "andre",
    title: "Music Show",
    content: "Jazz performance today",
    createdAt: new Date(now.getTime() - minutes * 60 * 1000),
  };

  // Populate postList
  useEffect(() => {
    const newPosts: IPost[] = [];
    for (let i = 0; i < 3; i++) {
      const createdAt = new Date(now.getTime() - i * 60 * 1000);
      newPosts.push({
        ...post1,
        createdAt,
        id: i.toString(),
      });
    }
    setPostList(newPosts);
  }, []);


  // Create
  function createPost(title: string, content: string){
    const post:IPost = {
      id: Math.random().toString(),
      username: localStorage.getItem("username")!,
      title: title,
      content: content,
      createdAt: now
    }
    setPostList((prevList) => [post, ...prevList]);
  }

  // Delete
  function openDeletionModal(post:IPost){
    setDeleteModalIsOpen(true);
    setPostToDelete(post);
  }

  function confirmDeletePost() {
    if (!postToDelete) return;
    setPostList((prevList) =>
      prevList.filter((post) => post.id !== postToDelete.id)
    );
    setDeleteModalIsOpen(false);
    setPostToDelete(null);
  }

  // Edit
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
      <h1 className="text-2xl font-bold bg-indigo-400 text-white p-5">
        CodeLeap Network
      </h1>
      {/* <div className="flex flex-col gap-4 p-6">
      <ButtonSuper variant="primary">Primary</ButtonSuper>
      <ButtonSuper variant="secondary">Secondary</ButtonSuper>
      <ButtonSuper variant="danger">Danger</ButtonSuper>
      <ButtonSuper variant="outline">Outline</ButtonSuper>
      <ButtonSuper variant="ghost">Ghost</ButtonSuper>
    </div> */}
      <div className="w-3.5/4 border rounded-xl p-5 border border-black-500 m-5">
        <Create header={`What's on your mind?`} createPost={createPost} />
      </div>

      {/* rendering posts  */}

      {postList.length === 0 ? <p className="text-center">There is no content. Post something!</p> : ""}
      {postList.map((post) => (
        <Post
          key={post.id}
          post={post}
          setDeleteModalIsOpen={() => openDeletionModal(post)}
          setEditModalIsOpen={() => openEditModal(post)}
        />
      ))}

      {/* Get username */}
      <Modal
        isOpen={getUsernameModalIsOpen}
        setIsOpen={setGetUsernameModalIsOpen}
        title="Welcome to CodeLeap network!"
        content={<GetUsernameModal setIsOpen={setGetUsernameModalIsOpen} />}
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
