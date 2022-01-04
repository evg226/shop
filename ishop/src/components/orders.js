import React from 'react'
import "./orders.css";

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
                <span>name</span>
                <span>color</span>
                <span>size</span>
                <span>quan</span>
                <span>price</span>
                <span>total</span>
            {

                !!order&&order.map(item=>
                    <OrderItem key={item.id} item={item} />
                )
            }
            </div>
        </>
    )
}

const OrderItem = ({item}) => {
    return (
        // <div className="order__item">
        <>
            <span>{item.status}</span>
            <span>{item.name}</span>
            <span>{item.color}</span>
            <span>{item.size}</span>
            <span>{item.quantity}</span>
            <span>{item.price}</span>
            <span>{item.total}</span>

        </>
        // </div>
    )
}
