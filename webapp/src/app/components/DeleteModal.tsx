import { useState } from "react";
import { IPost } from "../interfaces/IPost";

type DeleteModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  confirmDeletePost:() => void;
};

export default function DeleteModal({ setIsOpen, confirmDeletePost }: DeleteModalProps){

  return (<>
            <div className="flex items-center justify-end pt-3 pr-0">
              <button
                onClick={() => setIsOpen(false) }
                className={`px-5 py-1 border rounded-lg font-semibold transition-all duration-500 ease-in-out 
                  hover:bg-stone-200 cursor-pointer bg-gray-300" `}
              >Cancel</button>
              <button
                onClick={() => {setIsOpen(false); confirmDeletePost() }}
                className={`ml-3 px-5 py-1 rounded-lg font-semibold text-white  transition-all duration-500 ease-in-out 
                 bg-red-500 hover:bg-red-600  cursor-pointer`}
              >Delete</button>
            </div>
          </>)
}