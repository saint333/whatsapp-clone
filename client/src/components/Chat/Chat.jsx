import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

export default function Chat() {
  return (
    <div className='border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10'>
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
}
