import React, {useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {getCart} from "../store/selectors";
import {baseURL} from "../constants";
import {PRODUCT_ROUTE} from "../constants";
import {useNavigate} from "react-router";
import {Select} from "../components/selects";
import {addOrderDB, modifyCartDB, removeCart, removeCartDB} from "../store/action";

export const  Cart = () => {
    const navigate=useNavigate();
    const cart=useSelector(getCart,shallowEqual);
    const dispatch=useDispatch();
    const cartRows=cart.rows;

    const [country,setCountry]=useState("");
    const [state,setState]=useState("");
    const [postcode,setPostcode]=useState("");

    const hahdleMakeOrder = ()=>{
        if (country&&state) {
            const address = `${country}, ${state}, ${postcode}`;
            dispatch(addOrderDB(address));
        }
    }

    return (
        // <div >
        //     <h2>Корзина</h2>
            <main>
                <section className="cartbox">
                    <div className="container cartbox__container">
                        <div className="cartbox__left">
                            {cart.quantity > 0 ? cartRows.map(item=>
                                <CartItem key={item.id} item={item} />
                            )
                                : <div >There's no items in the cart</div>
                            }
                            <div className="cartbox__action">
                                <a className="cartbox__button">Clear Shopping Cart</a>
                                <a onClick={()=>navigate(PRODUCT_ROUTE)} className="cartbox__button">Continue Shopping</a>
                            </div>
                        </div>
                        <div className="cartbox__right">
                            <div className="cartbox__shipping">
                                <h2 className="cartbox__header">
                                    Shipping Address
                                </h2>
                                <input className="cartbox__input" type="text" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)} />
                                <input className="cartbox__input" type="text" placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} />s
                                <input className="cartbox__input" type="tel" placeholder="postcode" value={postcode} onChange={(e)=>setPostcode(e.target.value)} />
                                <a className="cartbox__button cartbox__button_shipping">get a quote</a>
                            </div>
                            <div className="cartbox__proseed">
                                <p className="cartbox__proseed-text-sub">Sub total <span>{cart.quantity} pieces</span></p>
                                <p className="cartbox__proseed-text-grand">Grand total <span>{cart.total}$</span></p>
                                <div className="cartbox__proseed-line"></div>
                                <button className="cartbox__proseed-button" onClick={hahdleMakeOrder}>Proseed</button>
                            </div>

                        </div>
                    </div>
                    {/*</form>*/}
                </section>
            </main>
        // /*</div>*/
    );
}

const CartItem =({item})=>{
    const [color,setColor]=useState(item.color);
    const [size,setSize]=useState(item.size);
    const [quantity,setQuantity]=useState(item.quantity);
    const dispatch=useDispatch();

    const handleUpdate = (e) => {
        e.preventDefault();
        if (color!==item.color||size!==item.size||quantity!==item.quantity) {
            const newItem = {id: item.id, color, size, quantity,price:item.price};
            dispatch(modifyCartDB(newItem));
        }
    }
    const handleDelete = (e) => {
        e.preventDefault();
        const removeItem = {id: item.id, quantity,price:item.price};
        dispatch(removeCartDB(removeItem));
    }

    return (
        <div className="cartbox__item">
            <div className="cartbox__item-picture">
                <img height="260px" src={baseURL+"static/" + item.image} alt=""/>
            </div>
            <form className="cartbox__item-desc">
                <div className="cartbox__item-header">{item.productName}</div>
                <div className="cartbox__item-text">
                    Price:&nbsp;&nbsp;
                    <span className="cartbox__item-text_price">{item.price}$</span>
                </div>
                <div className="cartbox__item-text">Color:
                    <Select name={"color"} theme="cartbox__item-text_input" onChange={setColor} value={color} />
                </div>
                <div className="cartbox__item-text">Size:&nbsp;&nbsp;
                    <Select name={"size"} theme="cartbox__item-text_input" onChange={setSize} value={size} />
                </div>
                <div className="cartbox__item-text">Quantity:&nbsp;&nbsp;
                    <input className="cartbox__item-text_input" type="number" name="quantity"
                           value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <div className="cartbox__item-buttons">
                    <button onClick={handleUpdate} value="update">Change</button>
                    <button onClick={handleDelete} name="action" value="delete">Delete</button>
                </div>
            </form>
        </div>
    )
}

