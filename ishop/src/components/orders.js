import React from 'react'
import "./orders.css";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getActiveUser} from "../store/selectors";
import {setStatusOrderDB} from "../store/action";

export const  Orders = ({orders}) => {
     return (
        <div>
            <h2 className="orders__caption">Orders</h2>
            {
                Object.keys(orders).map(id=>
                    <Order key={id} id={id} order={orders[id]} />
                )
            }
        </div>
    );
}

const Order = ({id,order})=>{

    return (
        <>
            <h4 className="order__caption">Order number: {id}</h4>
            <div className="order__items">
                <span>status</span>
                <span>X</span>
                <span>name</span>
                <span>color</span>
                <span>size</span>
                <span>quan</span>
                <span>price</span>
                <span>total</span>
            {
                !!order&&order.map(item=>
                    <OrderItem key={item.id} orderDate={id} item={item}  />
                )
            }
            </div>
        </>
    )
}

const OrderItem = ({item,orderDate}) => {
    const dispatch=useDispatch();
    const activeUser=useSelector(getActiveUser,shallowEqual);
    const handleSend = ()=>{
        if(activeUser.role==="ADMIN"){
            if (item.status==="created"&&window.confirm(`Do you want to send\n "${item.name}"\n to customer?`)){
                dispatch(setStatusOrderDB(item,orderDate,"sent"))
            }
            if (item.status==="sent"&&window.confirm(`Do you want to complete\n "${item.name}"\n?`)){
                dispatch(setStatusOrderDB(item,orderDate,"completed"))
            }
        }
    }

    const handleCancel = ()=>{
        if(activeUser.role!=="ADMIN"&&window.confirm(`Do you want to cancel\n "${item.name}"?`)){
                dispatch(setStatusOrderDB(item,orderDate,"cancelled"));
        }
    };


    return (
        // <div className="order__item">
        <>
            <span className="order__item" onClick={handleSend}>{item.status}</span>
            <span className="order__item" onClick={handleCancel}>X</span>
            <span className="order__item">{item.name}</span>
            <span className="order__item">{item.color}</span>
            <span className="order__item">{item.size}</span>
            <span className="order__item">{item.quantity}</span>
            <span className="order__item">{item.price}</span>
            <span className="order__item">{item.total}</span>

        </>
        // </div>
    )
}
