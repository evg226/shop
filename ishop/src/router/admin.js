import React, {useState} from 'react'
import "./admin.css";
import AdminOrders from "../components/AdminOrders";
export const  Admin = () => {

    const actions=[
        {id:1,name:"Orders",Component:<AdminOrders />},
        {id:2,name:"Product collections"},
        {id:3,name:"Product categories"},
        {id:4,name:"Products"},
    ];
    const [activeAction,setActiveAction]=useState(actions[0]);
    return (
        <div className="container">
            <h2 className="admin__caption">Admin panel</h2>
            <div className="admin__actions">
            {actions.map(item=>
                <div key={item.id} className={"admin__action"+(activeAction.id===item.id?" admin__action_selected":"")}
                      onClick={()=>setActiveAction(item)}  >{item.name}</div>
            )}
            </div>
            <div className="admin__container">
                {activeAction.Component}
            </div>


        </div>
    );
}

