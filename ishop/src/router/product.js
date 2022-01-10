import React, {useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getActiveProduct, getProductsPage} from "../store/selectors";
import {addCartDB, loadProduct, modifyCartDB} from "../store/action";
import {useParams} from "react-router";
import {baseURL} from "../constants";
import {Select} from "../components/selects";

export const  Product = () => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const product=useSelector (getActiveProduct,shallowEqual);
    const images=product.images;
    const [activeImage,setActiveImage]=useState(0);

    const [quantity,setQuantity]=useState(1);

    const [color,setColor]=useState("");
    const [size,setSize]=useState("");

    const handleAddCart = (e)=>{
        e.preventDefault();
       const newItem = {productId:product.id, color, size, quantity,price:product.price};
       dispatch(addCartDB(newItem));

    }

    useEffect(()=>{
        dispatch(loadProduct(id));
    },[id]);
    return (

        <main>
            <section className="product">
                <div className="product__picture">
                    <a onClick={()=>setActiveImage(prev=>prev==0?(images.length-1):(prev-1))} className="product__page">&lt;</a>
                    <div className="product__image">
                        <img src={baseURL+"static/"+(!!images?images[activeImage].path:"default")} alt={product.name}/>
                    </div>
                    <a onClick={()=>setActiveImage(prev=>prev==(images.length-1)?0:(prev+1))} className="product__page">&gt;</a>
                </div>
                <div className="product__white-box">
                    <div className="container"></div>
                </div>

                <div className="container">

                    <form action="engine/cartactions.php" method="get">
                        <div className="product__description">
                            <div className="product__collection">{product.collection_name} collection {product.category_name}</div>
                            <div className="product__3line">
                                {images&& images.map(item=>
                                    <div key={item.id} className={"product__3line-part"+((images[activeImage].id==item.id)?" product__3line-part_active":"")}></div>
                                )}

                            </div>
                            <h2 className="product__caption">{product.name}</h2>
                            <p className="product__text">{product.description}</p>
                            <div className="product__price">{product.price}$</div>
                            <div className="product__line"></div>
                            <div className="product__choose" style={{display:"flex"}}>
                                <Select name={"color"} onChange={setColor} value={color} theme={{height:"100%"}} />
                                <Select name={"size"} onChange={setSize} value={size} />
                                    <input type="number" name="quantity"
                                       placeholder="quantity" id="quantity"
                                       value={quantity}
                                       onChange={(e)=>setQuantity(e.target.value)}
                                />
                            </div>
                            <button onClick={handleAddCart} type="submit" className="product__button">
                                <img src="img/cart-red.svg" alt="" />
                                Add to Cart</button>
                        </div>
                    </form>
                </div>


            </section>


            <div className="featured">
                <div className="featured__container container featured__container_product">

                    <article className="featured__box">

                        <div className="featured__item">
                            <a href="product.php?productId=7" className="featured__item-link">
                                <div className="featured__item-img">
                                    <img src="img/feature1.png" alt="" />
                                </div>
                                <div className="featured__item-header">
                                    <h3 className="featured__item-heading">
                                        ELLERY X M'O CAPSULE
                                    </h3>
                                    <div className="featured__item-desc">
                                        Known for her sculptural takes on traditional tailoring, Australian arbiter of
                                        cool
                                        Kym Ellery
                                        teams up with Moda Operandi.
                                    </div>
                                    <div className="featured__item-price">
                                        $52.00
                                    </div>
                                </div>
                            </a>
                            <div className="featured__item_add">
                                <a href="cart.html" className="featured__item_add-link">
                                    Add to Cart
                                </a>
                            </div>
                        </div>


                        <div className="featured__item featured__item_product-disappear">
                            <a href="product.php?productId=6" className="featured__item-link">
                                <div className="featured__item-img">
                                    <img src="img/feature3.png" alt="" />
                                </div>
                                <div className="featured__item-header">
                                    <div className="featured__item-heading">
                                        ELLERY X M'O CAPSULE
                                    </div>
                                    <div className="featured__item-desc">
                                        Known for her sculptural takes on traditional tailoring, Australian arbiter of
                                        cool
                                        Kym Ellery
                                        teams up with Moda Operandi.
                                    </div>
                                    <div className="featured__item-price">
                                        $52.00
                                    </div>
                                </div>
                            </a>
                            <div className="featured__item_add">
                                <a href="cart.html" className="featured__item_add-link">
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                    </article>

                </div>

            </div>

        </main>
    );
}

