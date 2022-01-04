import React from 'react'
import "./orders.css";
import {useDispatch} from "react-redux";
import {cancelOrderDB} from "../store/action";

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
    return (
        // <div className="order__item">
        <>
            <span className="order__item">{item.status}</span>
            <span className="order__item" onClick={()=>dispatch(cancelOrderDB(item,orderDate))}>X</span>
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
