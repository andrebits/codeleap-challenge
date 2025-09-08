
"use client"
import Image from "next/image";
import { IPost } from "../interfaces/IPost";
import Link from "next/link";
import { timeAgo } from "../utils/timeAgo";

interface PostProps {
    post: IPost,
    setDeleteModalIsOpen: (isOpen: boolean) => void;
    setEditModalIsOpen: (isOpen: boolean) => void;
}

export default function Post({post, setDeleteModalIsOpen, setEditModalIsOpen}: PostProps){

    const username = localStorage.getItem("username");

    return (
        <div className="">
            <div  className="flex justify-between text-2xl border rounded-t-xl rounded-b-none font-bold bg-indigo-400 border-indigo-400/90 text-white p-5 mx-5">
                <h1>{post.title}</h1>
                {post.username === username && (
                    <div className="flex justify-between text-gray-500 pb-1">
                        <Link href="#" className="mr-2" onClick={()=>setDeleteModalIsOpen(true)}>
                            <Image src="/icons/delete.svg" alt="Editar" width={24} height={24} 
                            className="w-auto cursor-pointer transform hover:scale-120 transition-transform duration-200"
                            ></Image>
                        </Link>
                        <Link href="#" onClick={()=>setEditModalIsOpen(true)}>
                            <Image src="/icons/edit.svg" alt="Editar" width={24} height={24} 
                            className="w-auto cursor-pointer transform hover:scale-120 transition-transform duration-200"
                            ></Image>
                        </Link>
                    </div>
                )}
            </div>
            <div className="p-5 w-3.5/4 border mt-0 m-5 border-t-0 rounded-t-none rounded-b-xl ">
                <div className="flex justify-between text-gray-500 pb-1">
                    <p className="text-left font-bold">@{post.username}</p>
                    <p className="text-right text-right">{timeAgo(post.created_datetime)}</p>
                </div>
                <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
        </div>
    );
}