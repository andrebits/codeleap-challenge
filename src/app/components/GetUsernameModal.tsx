import { useRef, useState } from "react";

type GetUsernametModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function GetUsernameModal({ setIsOpen }: GetUsernametModalProps){
  const [active, setActive] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const usernameField = useRef<HTMLInputElement | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
    if(event.target.value ===  ""){
      setActive(false);
    } else {
      setActive(true);
    }
  }

  function handleUsernameClick(){
    if(usernameField.current){
      setUsername(usernameField.current.value);
      localStorage.setItem("username", username);
    }
  }

  return (<>
            <p className="text-align-left">Please enter your username</p>
            <input 
              type="text"
              ref={usernameField}
              value={username}
              onChange={handleChange}
              className="w-[100%] border rounded p-2" placeholder="Type your username"></input>

            <div className="flex items-center justify-end pt-3 pr-0">
              <button
                onClick={() => {
                  if(active){
                    handleUsernameClick();
                    setIsOpen(false); 
                  }
                  }} 
                className={`px-5 py-1 uppercase rounded-lg font-semibold text-white shadow-lg transition-all duration-500 ease-in-out 
                  ${active ? "bg-blue-500 hover:bg-blue-600  cursor-pointer" : "bg-gray-300"}`}
              >Enter</button>
            </div>
          </>)
}