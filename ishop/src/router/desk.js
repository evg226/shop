import React from 'react'
import {useLocation, useNavigate} from "react-router";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCart, getCategoriesFull, getProductsPage} from "../store/selectors";
import {loadProductsPage} from "../store/action";
import {PRODUCT_ROUTE} from "../constants";

export const  Desk = () => {

    const navigate = useNavigate();

    const productsPage=useSelector (getProductsPage,shallowEqual);
    const limit=productsPage.limit;

    // const cartQuantity=useSelector(getCart,shallowEqual).quantity;

    const collectionsNav=useSelector(getCategoriesFull,shallowEqual);
    const dispatch=useDispatch();

    const handleClickItem=(collection)=>{
        const find=collectionsNav.find(item=>item.id==collection)
        dispatch(loadProductsPage(1,limit,find&&find.id));
        navigate(PRODUCT_ROUTE);
    }

    return (
        <main>
            <section className="main__offer container">
                <div className="main__offer__top">
                    <a onClick={()=>handleClickItem(2)} className="main__offer__item">

                        <div className="main__offer__item__text">
                            <h2 className="main__offer__item__text_top">
                                30% off
                            </h2>
                            <p className="main__offer__item__text_bottom">
                                for women
                            </p>
                        </div>
                        <img src="img/for_women.png" alt="for women" />


                    </a>

                    <a onClick={()=>handleClickItem(1)} className="main__offer__item">

                        <div className="main__offer__item__text">
                            <h2 className="main__offer__item__text_top">
                                hot deal
                            </h2>
                            <p className="main__offer__item__text_bottom">
                                for men
                            </p>
                        </div>
                        <img src="img/for_men.png" alt="for men" />

                    </a>

                    <a onClick={()=>handleClickItem(3)} className="main__offer__item">

                        <div className="main__offer__item__text">
                            <h2 className="main__offer__item__text_top">
                                new arrivals
                            </h2>
                            <p className="main__offer__item__text_bottom">
                                for kids
                            </p>
                        </div>
                        <img src="img/for_kids.png" alt="for_kids" />


                    </a>
                </div>

                <a onClick={()=>handleClickItem(4)} className="main__offer__item main__offer__bottom">

                    <div className="main__offer__item__text">
                        <h2 className="main__offer__item__text_top">
                            luxorious&trendy
                        </h2>
                        <p className="main__offer__item__text_bottom">
                            accesories
                        </p>
                    </div>
                    <img src="img/accessories.png" alt="for_kids" />

                </a>
            </section>



            <section className="delivery">
                <div className="delivery__box container">

                    <a  className="delivery__card">
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

                    <a  className="delivery__card">
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

                    <a  className="delivery__card">
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

