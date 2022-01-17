import React, { useEffect} from 'react'
import {shallowEqual, useDispatch,useSelector} from "react-redux";
import {addCartDB, LazyAddProductsPageDB, loadProductsPage} from "../store/action";
import {getLoadingState, getProductsPage} from "../store/selectors";
import {baseURL} from "../constants";
import {useNavigate } from "react-router";
import {PRODUCT_ROUTE} from "../constants";

export const  Catalog = () => {
    const dispatch=useDispatch();
    const productsPage=useSelector (getProductsPage,shallowEqual);
    const productsCount=productsPage.count;
    const activePage=productsPage.page;
    const limit=productsPage.limit;
    const products = productsPage.products;

    const pagesCount= Math.ceil(productsCount/limit);
    const pages=[];
    for (let i=1;i<=pagesCount;i++) pages.push(i);

    const handleChangePage=(page)=>{
        let current=page;
        if (page<1) {
            current = pagesCount
        } else if (page>pagesCount){
            current=1;
        }
        dispatch(loadProductsPage(current,limit,productsPage.collectionId,productsPage.categoryId));
    }

    const loadingState=useSelector(getLoadingState,shallowEqual);
    const handleSeeMore =(e)=>{
        if ((e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight))===0){
            !loadingState.isLoading &&
            dispatch(LazyAddProductsPageDB(productsPage.collectionId,productsPage.categoryId));
        }


    }


    useEffect(()=>{
        document.addEventListener("scroll",handleSeeMore)
        return ()=> document.removeEventListener("scroll",handleSeeMore);
    },[]);

    return (
        <main>
            <nav className="filter">
                <ul className="container filter__container">
                    <li className="filter__item filter__item_1">
                        <div className="filter__item-caption filter__item-caption-close">
                            <span>Filter</span><img src="img/filter.svg" alt="" />
                        </div>
                        <div className="filter__item-drop filter__item-drop-1">
                            <details open className="filter__subitem">
                                <summary className="summary_1">Category</summary>
                                <div className="filter__subitem-drop">
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Bags</div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                </div>
                            </details>
                            <details className="filter__subitem">
                                <summary>Designer</summary>
                                <div className="filter__subitem-drop">
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Bags</div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                </div>
                            </details>
                            <details className=" filter__subitem">
                                <summary>Price</summary>
                                <div className="filter__subitem-drop">
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Bags</div>
                                    <div className="filter__subitem-drop-link filter__subitem-drop-link-1">Accesories
                                    </div>
                                    <div
                                        className="filter__subitem-drop-link filter__subitem-drop-link-1 filter__subitem-drop-link-last">
                                        Accesories
                                    </div>
                                </div>
                            </details>
                        </div>
                    </li>

                    <li className="filter__item">

                        <div className="filter__item-caption">
                            <span>Trending&nbsp;now</span><img src="img/Filter2.svg" alt="" />
                        </div>
                        <div className="filter__item-drop">

                            <div className="filter__subitem-drop-link">Accesories</div>
                            <div className="filter__subitem-drop-link">Bags</div>
                            <div className="filter__subitem-drop-link">Accesories</div>
                            <div className="filter__subitem-drop-link">Accesories</div>
                        </div>
                    </li>

                    <li className="filter__item">

                        <div className="filter__item-caption">
                            <span>Size</span><img src="img/Filter2.svg" alt="" />
                        </div>
                        <div className="filter__item-drop">
                            <form action="#">
                                <div className="filter__subitem-drop-link">
                                    <input type="checkbox" name="xs" /> XS
                                </div>
                                <div className="filter__subitem-drop-link">
                                    <input type="checkbox" name="s" /> S
                                </div>
                                <div className="filter__subitem-drop-link">
                                    <input type="checkbox" name="m" /> M
                                </div>
                                <div className="filter__subitem-drop-link">
                                    <input type="checkbox" name="l" /> L
                                </div>
                            </form>
                        </div>
                    </li>

                    <li className="filter__item">

                        <div className="filter__item-caption">
                            <span>Price</span><img src="img/Filter2.svg" alt="" />
                        </div>
                        <div className="filter__item-drop filter__item-drop-4">

                            <div className="filter__subitem-drop-link">100$</div>
                            <div className="filter__subitem-drop-link">500$</div>
                            <div className="filter__subitem-drop-link">1000$</div>
                            <div className="filter__subitem-drop-link">More</div>
                        </div>
                    </li>
                </ul>
            </nav>

            <div className="featured">
                <div className="featured__container container">
                    <article className="featured__box">

                        {products&&products.map(item=><CatalogItem key={item.id} item={item} />)}

                    </article>

                    <div className="pages">
                        <div className="pages__content">
                            <a className={"pages__link pages__link_active"}
                               onClick={()=>dispatch(LazyAddProductsPageDB(productsPage.collectionId,productsPage.categoryId))}>
                                See more...
                            </a>
                            <a onClick={()=>handleChangePage(activePage-1)} className="pages__link pages__link_browse">&lt;</a>
                            {pagesCount&&pages.map(item=>
                                <a key={item} className={"pages__link"+(activePage===item?" pages__link_active":"")}
                                   onClick={()=>handleChangePage(item)}>{item}</a>
                            )}
                            <a className="pages__link pages__link_browse"
                               onClick={()=>handleChangePage(activePage+1)}>&gt;</a>
                        </div>
                    </div>

                </div>

            </div>


            <section className="delivery">
                <div className="delivery__box container">

                    <a href="#" className="delivery__card">
                        <div className="delivery__img">
                            <img src="img/delivery.svg" alt="" />
                        </div>
                        <h2 className="delivery__cap">
                            Free Delivery
                        </h2>
                        <div className="delivery__text">
                            Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive
                            models.
                        </div>
                    </a>

                    <a href="#" className="delivery__card">
                        <div className="delivery__img">
                            <img src="img/persent.svg" alt="" />
                        </div>
                        <div className="delivery__cap">
                            Sales & discounts
                        </div>
                        <div className="delivery__text">
                            Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive
                            models.
                        </div>
                    </a>

                    <a href="#" className="delivery__card">
                        <div className="delivery__img">
                            <img src="img/crown.svg" alt="" />
                        </div>
                        <div className="delivery__cap">
                            Quality assurance
                        </div>
                        <div className="delivery__text">
                            Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive
                            models.
                        </div>
                    </a>
                </div>
            </section>
        </main>
    );
}

export const CatalogItem= ({item})=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleAddCart = () => {

        dispatch(addCartDB({productId:item.id}));
    }
    return (
        <div key={item.id} className="featured__item">
            <a onClick={()=>navigate(PRODUCT_ROUTE+"/"+item.id)} className="featured__item-link">
                <div className="featured__item-img">
                    <img src={baseURL+"static/" + item.image} alt="" />
                </div>
                <div className="featured__item-header">
                    <h3 className="featured__item-heading">
                        {item.name}
                    </h3>
                    <div className="featured__item-desc">
                        {item.description}
                    </div>
                    <div className="featured__item-price">
                        ${item.price}
                    </div>
                </div>
            </a>
            <div className="featured__item_add">
                <a onClick={handleAddCart}
                   className="featured__item_add-link">
                    Add to Cart
                </a>
            </div>
        </div>
    );
}