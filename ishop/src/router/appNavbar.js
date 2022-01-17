import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router';


import {DESK_ROUTE,CART_DESK,USER_ROUTE,PRODUCT_ROUTE} from "../constants";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCart, getCategoriesFull, getProductsPage} from "../store/selectors";
import {loadProductsPage} from "../store/action";
import Banner from "../components/banner";

export const AppNavbar = () => {
    // const isAuthed = true;
    const navigate = useNavigate();

    const productsPage=useSelector (getProductsPage,shallowEqual);
    const limit=productsPage.limit;

    const cartQuantity=useSelector(getCart,shallowEqual).quantity;

    const collectionsNav=useSelector(getCategoriesFull,shallowEqual);
    const dispatch=useDispatch();
    const location=useLocation();
    const handleClickItem=(filter)=>{

        setHamb(false);
        dispatch(loadProductsPage(1,limit,filter.collectionId,filter.categoryId));
        navigate(PRODUCT_ROUTE);
    }

    const handleClickSignin = () => {
        // if (!isAuthed) {
            navigate(USER_ROUTE);
        // } else {
        //     navigate(DESK_ROUTE);
        // }
    }

    const [hamb, setHamb] = useState(false);
    const handleMenuToogle = () => {
        setHamb(!hamb);
    }



    return (
        <>
        <nav className="navbar">
            <ul   className={"subnav " + (hamb ? "open" : "")} id='nav'>
                <li className="subnav__item">
                    <a onClick={handleMenuToogle} className="subnav__link subnav__link-close" id="close_menu">
                        <img src="../img/close.svg" alt="Close"/></a>
                </li>
                <li className="subnav__item">
                    <a onClick={()=>handleClickItem({})} className="subnav__link subnav__link-gr subnav__link-menu">ALL</a>
                </li>

                {hamb&&collectionsNav.length&&collectionsNav.map(collection=>
                    <React.Fragment key={collection.id}>
                        <li className='subnav__item'><a onClick={()=>handleClickItem({collectionId:collection.id})}
                                                        className='subnav__link subnav__link-gr'>{collection.name}</a></li>

                        {collection.categories.length&&collection.categories.map(category=>
                            <li key={category.id} className='subnav__item'><a onClick={()=>handleClickItem({categoryId: category.id})}
                                                            className='subnav__link'>{category.name}</a></li>
                        )}

                    </React.Fragment>
                )}

            </ul>

            <div className="navbar__container container">
                <div className="navbar__side">
                    <a onClick={() => navigate(DESK_ROUTE)} className="navbar__item item_home ">
                        <img src="../img/menu1.svg" alt="Home icon"/>
                    </a>
                    <a className="navbar__item item_search">
                        <img src="../img/menu-search.svg" alt="Search icon"/>
                    </a>
                </div>
                <div className="navbar__side navbar__side-right">
                    <a onClick={handleMenuToogle}
                       className={"navbar__item item-hamburger" + (hamb ? " change" : "")} id="item-hamburger">
                        <img src="../img/menu_hamb.svg" alt="Submenu icon"/>
                    </a>
                    <a onClick={() => navigate(USER_ROUTE)} className="navbar__item item_login">
                        <img src="../img/user.svg" alt="Login icon"/>
                    </a>
                    <a onClick={() => navigate(CART_DESK)} className="navbar__item item__cart">
                        <img src="../img/cart.svg" alt="Submenu icon"/>
                        <div className="item__cart__count">
                            {cartQuantity||0}
                        </div>
                    </a>
                </div>
            </div>
        </nav>

            {(location.pathname===DESK_ROUTE)&&<Banner />}
        </>
    );
}
