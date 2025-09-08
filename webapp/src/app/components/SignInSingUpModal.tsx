import { useEffect, useRef, useState } from "react";
import { login, register } from "../api/api";
import IUser from "../interfaces/IUser";
import Link from "next/link";

type GetUsernametModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function SignInSignUpModal({ setIsOpen }: GetUsernametModalProps){
  const [active, setActive] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameField = useRef<HTMLInputElement | null>(null);
  const passwordField = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<string| null>(null);

  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(()=>{
    setMessage(null)
  }, [isLogin]);

  function handleChange() {
    if(usernameField.current && passwordField.current){
      setUsername(usernameField.current.value);
      setPassword(passwordField.current.value);
      
      if(usernameField.current.value ===  "" || passwordField.current.value === ""){
        setActive(false);
      } else {
        setActive(true);
      }
    }
  }

  function handleSingInClick(){
    if(usernameField.current && passwordField.current){
      const user: IUser ={
        username: username,
        password: password,
      }

      login(user).then((response) =>{
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("username", user.username);
        setMessage(null);
        setIsOpen(false);

      },(error) =>{
        if (error.status === 401){
          setMessage("user or password invalid");
        }
      })
    }
  }

  function handleSingUpClick(){
    if(usernameField.current && passwordField.current){
      const user: IUser ={
        username: username,
        password: password,
      }

      register(user).then((response) =>{
        if (response.status === 201){
          handleSingInClick();
        }
      },(error) =>{
        console.log("error:", error);
        if (error.status === 400){
          setMessage(error.response.data.username);
        }
      })
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      if(usernameField.current && passwordField.current){
        if(usernameField.current!.value ===  "" || passwordField.current.value === "") return;
      }
      e.preventDefault(); 
      isLogin ? handleSingInClick() : handleSingUpClick();
    }
  }

  return (<div className="max-w-[400px] m-auto">
            <p className="text-left">Please enter your username</p>
            <input 
              type="text"
              ref={usernameField}
              value={username}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-[100%] border rounded p-2" placeholder="Type your username"></input>

            <p className="mt-5 text-left">Please enter your password</p>
            <input 
              type="password"
              ref={passwordField}
              value={password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-[100%] border rounded p-2" placeholder="Type your password"></input>
            
            {isLogin && (
              <p className="text-sm text-end p-1 pr-0">
              Do not have an account? <Link href="#" className="text-indigo-500 hover:underline" onClick={()=>setIsLogin(false)}> Sing up</Link></p>)}

            {!isLogin && (
              <p className="text-sm text-end p-1 pr-0">
              Already have an account? <Link href="#" className="text-indigo-500 hover:underline" onClick={()=>setIsLogin(true)}> Sing in</Link></p>)}
            {message && <p className="text-center text-red-500 mt-2">{message}</p>}
            
            <div className="flex items-center justify-end pr-0 mt-5">
              
              {isLogin && (<button
                onClick={(e) => {active ? handleSingInClick(): e.preventDefault() }} 
                className={`w-32 px-5 py-1 uppercase rounded-lg font-semibold text-white shadow-lg transition-all duration-500 ease-in-out 
                  ${active ? "bg-blue-500 hover:bg-blue-600  cursor-pointer" : "bg-gray-300"}`}
                >Sign in</button>) }

              {!isLogin && (<button
                onClick={(e) => {active ? handleSingUpClick(): e.preventDefault() }} 
                className={`w-32 px-5 py-1 uppercase rounded-lg font-semibold text-white shadow-lg transition-all duration-500 ease-in-out 
                  ${active ? "bg-green-500 hover:bg-green-600  cursor-pointer" : "bg-gray-300"}`}
                 >Sign up</button>) }

            </div>
          </div>)
}