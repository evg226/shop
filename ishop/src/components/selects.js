import React, {useState} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {getCategoriesFull} from "../store/selectors";



export const Select=({name,theme,value,onChange})=>{
    let options=[];
    const colors=[
        {id:1,name:"red"},{id:2,name:"blue"},{id:3,name:"green"},
    ];
    const sizes=[
        {id:1,name:"XXL"},{id:2,name:"L"},{id:3,name:"XS"},
    ];
    switch (name) {
        case "color":
            options=colors;
            break;
        case "size":
            options=sizes;
            break;
    }

    return (
        <select className={theme} value={value} id={name} onChange={(e)=>onChange(e.target.value)}>
            <option value="">{name} choose</option>
            {options&&options.map(item=>
                <option key={item.id} value={item.name}>{item.name}</option>
            )}
        </select>
    )
}

export const SelectCategories=({theme,setCategory})=>{
    const collections=useSelector(getCategoriesFull,shallowEqual);
    const [value,setValue]=useState("");
    return (
        <select className={theme} value={value} onChange={(e)=>setCategory(e.target.value)}>
            {(!!collections)&&collections.map(collection=>
                (!!collection)&&collection.categories.map(category=>
                    <option key={category.id} value={category.id}>{collection.name+": "+category.name}</option>
                    )
            )}
        </select>
    )
}
