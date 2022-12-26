import { createContext, useState } from "react";

export const CounterContext = createContext();

export const CounterProider = (props)=>{
    const [globalCount,setGlobalCount]=useState(0)

    const counterContextValue = {
        globalCount:globalCount,
        inCrease: ()=>{
            setGlobalCount(globalCount + 1);
        },
        deCrease: ()=>{
            if(globalCount > 0){
                setGlobalCount(globalCount - 1);
            }           
        }
    }
    return (
        <CounterContext.Provider value = {counterContextValue}>
           {props.children}
        </CounterContext.Provider>
    )
}