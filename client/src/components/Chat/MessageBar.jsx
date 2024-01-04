import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

export default function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message
      })
      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message
      })
      dispatch({ type: reducerCases.ADD_MESSAGE, newMessage: {
        ...data.message
      }, fromSelf: true})
      setMessage("")
    } catch (error) {
      console.log("🚀 ~ file: MessageBar.jsx:22 ~ sendMessage ~ error:", error)
    }
  };

  return (
    <div className='bg-panel-header-background h-20 px-4 flex items-center gap-6 relative'>
      <>
        <div className='flex gap-6'>
          <BsEmojiSmile
            className='text-panel-header-icon cursor-pointer text-xl'
            title='Emoji'
          />
          <ImAttachment
            className='text-panel-header-icon cursor-pointer text-xl'
            title='Attach File'
          />
        </div>
        <div className='w-full rounded-lg h-10 flex items-center'>
          <input
            type='text'
            placeholder='Type a message'
            className='bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg w-full px-5 py-4'
            onChange={e => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className='flex w-10 items-center justify-center'>
          <button>
            <MdSend
              className='text-panel-header-icon cursor-pointer text-xl'
              title='Send message'
              onClick={sendMessage}
            />
            {/* <FaMicrophone className='text-panel-header-icon cursor-pointer text-xl' title='Record'/> */}
          </button>
        </div>
      </>
    </div>
  );
}
