import { useRef, useState } from "react";
import { IPost } from "../interfaces/IPost";
import Form from "./Form";

type EditModalProps = {
    post: IPost;
    setIsOpen: (post:IPost) => void;
    saveEdited:(post: IPost) => void;
    setEditModalIsOpen:(isopen: boolean) => void,

};

export default function EditModal({post, setIsOpen, saveEdited, setEditModalIsOpen}:EditModalProps){
    const [active, setActive] = useState(true);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    function handleClickEdit(newTitle: string, newContent: string){
        // atualizar 
        // post com new title e new content
        const updatedPost = { ...post, title: newTitle, content: newContent };
        saveEdited(updatedPost)

    }

    return (
            <Form 
                title={post.title}
                content={post.content}
                // handleChange={handleChange}
                handleClickEdit={handleClickEdit}
                isCreatePost={false}
                setEditModalIsOpen={setEditModalIsOpen}
            ></Form>

    );
}