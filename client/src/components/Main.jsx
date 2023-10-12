import React from "react";
import Empty from "./Empty";
import ChatList from "./Chatlist/ChatList";

function Main() {
  return <>
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />
      <Empty />
    </div>
  </>;
}

export default Main;