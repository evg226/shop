import React, {useState} from 'react'
import "./admin.css";
import {AdmCollection} from "../components/admCollection";

import {AdmProducts} from "../components/admProduct";

export const  Admin = () => {
    const actions=[
        {id:1,name:"Collections & categories",Component:<AdmCollection />},
        // {id:2,name:"Product categories",Component:<AdmCategories />},
        {id:2,name:"Products",Component:<AdmProducts />},
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

