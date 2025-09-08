import { useState } from "react";
import Form from "./Form";

export default function Create({header, createPost}:{header:string, createPost:(title: string, content: string)=> void}){
    // const [active, setActive] = useState(false);


    function handleClickCreate(title: string, content:string){
        if (title && content){
            createPost(title, content);
        }
    }

    return (
        <>
            <h1 className="text-xl font-bold pb-5">{header}</h1>
            <Form 
                handleClickCreate={handleClickCreate}
                isCreatePost={true}
            ></Form>
        </>
    );
}