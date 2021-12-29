import React from "react";



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
