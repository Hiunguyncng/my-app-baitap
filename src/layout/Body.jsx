import { useEffect, useState } from "react";
import TodoItem from "../components/todo-item/TodoItem";
import { MODE, STATUS } from "../const/index";
import { TodoList } from "../const/index";
import { localStoregeUlti } from "../functions/localStorage";
import DetailTaskForm from "../Shared/DetailtTaskForm";
import AddNewForm from "../Shared/Form";

const {get,set} = localStoregeUlti('todoItem',[]);

const Body = ({ mode, handleChangeRenderMode }) => {
  // const {NEW,DOING,DONE} = STATUS;
  const [todoItems, setTodoItems] = useState([]);
  const [filterText,setFilterText]= useState('');
  const [indexCurrentTask,setindexCurrentTask]= useState(null)
  const [currentTask,setcurrentTask] = useState({
    title: '',
    creator: '',
    description: '',
    status:STATUS.NEW,

  })
  const handleShowDetailTask = (item,index) => {
    setcurrentTask(item);
    setindexCurrentTask(index);
    handleChangeRenderMode(MODE.DETALL_TASK);
  }

  // const updateTask= (e,item) =>{
  //   e.preventDefault();
  //   const todoItemLocalStorage = get();
  //   todoItemLocalStorage.splice(indexCurrentTask,1,item);
  //   setTodoItems([...todoItemLocalStorage]);
  //   set([...todoItemLocalStorage]);
  //   handleChangeRenderMode(MODE.SHOW_LIST)
  // }

  // const deleteTask = (e) => {
  //   e.preventDefault();
  //   const todoItemLocalStorage = get();
  //   todoItemLocalStorage.splice(indexCurrentTask,1);
  //   setTodoItems([...todoItemLocalStorage]);
  //   set([...todoItemLocalStorage]);
  //   handleChangeRenderMode(MODE.SHOW_LIST)
  // }

  const handlechangeTask = (e,item)=> {
    e.preventDefault();
    const todoItemLocalStorage = get();
    if(item){
      todoItemLocalStorage.splice(indexCurrentTask,1,item);

    }else{
      todoItemLocalStorage.splice(indexCurrentTask,1);
      setTodoItems([...todoItemLocalStorage]);
      set([...todoItemLocalStorage]);
      handleChangeRenderMode(MODE.SHOW_LIST)
    }
  }

  

  useEffect(()=>{
    setTodoItems(get());
  },[]);

  useEffect(()=>{
    const keyword=window.location.search.slice(9);
    setFilterText(keyword);
  },[]);

  const renderTodoItem = () => {
    return todoItems
    .filter((item)=>item.title.includes(filterText))
    .map((item, index) => (
      <TodoItem
        key={`${item.title}${index}`}
        title={item.title}
        creator={item.creator}
        status={item.status}
        description={item.description}
        handleClick= {()=> handleShowDetailTask(item,index)}
      />
    ));
  };

  const chooseMode = () => {
    switch (mode) {
      case MODE.SHOW_LIST:
        return renderTodoItem();
      case MODE.ADD_NEW:
        return (
        <AddNewForm
            handleSubmit={(e) => {
              e.preventDefault();
              const data = {
                title: e.target[0].value,
                creator: e.target[1].value,
                description: e.target[2].value,
                status: STATUS.NEW,

              }
              setTodoItems([data,...todoItems]);
              set([data,...todoItems])
              handleChangeRenderMode(MODE.SHOW_LIST)
            }}
          />
        )
      case MODE.DETALL_TASK:
        return(
          <DetailTaskForm
            currentTask={currentTask}
            handlechangeTask={handlechangeTask}
          />
        )
      

  
      default:
        return renderTodoItem();
    }
  };
  return <div className="containerBody">{chooseMode()}</div>;
};
export default Body;
