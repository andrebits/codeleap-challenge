import { RefObject, useEffect, useRef, useState } from "react";

type TForm = {
    title?: string,
    content?: string,
    handleClickCreate?: (newTitle: string, newContent: string) => void,
    handleClickEdit?: (newTitle: string, newContent: string) => void,
    isCreatePost: boolean,
    setEditModalIsOpen?: (isOpen: boolean) => void,
}

export default function Form({
    title, 
    content, 
    handleClickCreate, 
    handleClickEdit, 
    isCreatePost, 
    setEditModalIsOpen}: TForm){

    const [active, setActive] = useState(false);
    const titleField = useRef<HTMLInputElement | null>(null);
    const contentField = useRef<HTMLTextAreaElement | null>(null);

    function handleChange() {
        if (titleField.current && contentField.current){
            if(titleField.current.value !==  "" && contentField.current.value !==  ""){
                setActive(true);
            }else{
                setActive(false);
            }
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); 
            if (isCreatePost) {
                handleClickCreate?.(titleField.current!.value, contentField.current!.value);

                if (titleField.current && contentField.current) {
                    titleField.current.value = "";
                    contentField.current.value = "";
                    setActive(false);
                }
            } else {
                handleClickEdit?.(titleField.current!.value, contentField.current!.value);
            }
        }
    }

 
    return (
        // <div className={isCreatePost ? "w-full" : "w-3/4"}>
        <div>
            <p>Title</p>
            <input 
            type="text"
            ref={titleField}
            defaultValue={title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Hello world"
            className="w-full border rounded-xl p-2 mt-1 mb-5"></input>
            <p>Content</p>
            <textarea 
            placeholder="Content here"
            defaultValue={content}
            ref={contentField} 
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full h-24 border rounded-xl p-2 mt-1 resize-none"></textarea >
            <div className="flex items-center justify-end pt-3 pr-0">
                {isCreatePost && (
                <button
                onClick={(e)=> {
                    if(active){
                        handleClickCreate?.(titleField.current!.value, contentField.current!.value);
                        titleField.current!.value = "";
                        contentField.current!.value = "";
                        setActive(false);
                    } else e.preventDefault();
                }} 
                className={`w-32 px-5 py-1 uppercase rounded-lg font-semibold text-white shadow-lg transition-all duration-500 ease-in-out ${active ? "bg-indigo-400 hover:bg-indigo-600 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer " : "bg-gray-300"}`}
                >Create</button>)
                }
                {!isCreatePost && (
                <>
                    <button
                        onClick={() => setEditModalIsOpen?.(false) }
                        className={`w-32 mr-5 px-5 py-1 border rounded-lg font-semibold transition-all duration-500 ease-in-out 
                        hover:bg-stone-200 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg " `}
                    >Cancel</button>
                    <button
                    onClick={()=> handleClickEdit?.(titleField.current!.value, contentField.current!.value)}
                    className={`w-32 px-5 py-1 rounded-lg font-semibold text-white shadow-lg transition-all duration-500 ease-in-out ${active ? "bg-green-500 hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg  cursor-pointer " : "bg-gray-300"}`}
                    >Save</button>
                </>
                )}

            </div>
        </div>
    );
}