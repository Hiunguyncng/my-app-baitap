import { useState } from "react";

function Header({handleCreatorNewTask}) {
  const [keyword,setkeyword]=useState('')
  const handelSearchClick= () =>{
    window.location.search=`?keyword=${keyword.trim()}`
    setkeyword('')
  }

  return (
    <div className="containerHeader">
      <div className="containerHeader__left">
        <button onClick={handleCreatorNewTask}>Create New Task</button>
      </div>
      <div className="containerHeader__right">
        <input onChange={(e)=>setkeyword(e.target.value)} value={keyword} type="text" placeholder="Type something to search"/>
        <button onClick={handelSearchClick}>Search</button>
      </div>
    </div>
  );
}
export default Header;
