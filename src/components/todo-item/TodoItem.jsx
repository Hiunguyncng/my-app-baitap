
 function TodoItem({title,creator,status,description,handleClick}){
    
    return (
        <div className="containerItem" onClick={handleClick} style={{cursor:"pointer"}}>
        <p className="containerItem__title">Title:{title}</p>
        <p className="containerItem__creator">Creator:{creator}</p>
        <p className={`containerItem__status containerItem__status--${status?.toLowerCase()}`}> Status:{status}</p>
        <hr className="containerItem__linkBreak"/>
        <p className="containerItem__description">
            <p>Description:</p>
            <p>{description}</p>
            
            </p>
    </div>
    );
}

export default TodoItem;
