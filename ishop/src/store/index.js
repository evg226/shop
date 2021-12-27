import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {reducerActiveProduct, reducerCategories, reducerProducts, reducerUser} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combineReducers({
        user: reducerUser,
        productsPage:reducerProducts,
        activeProduct:reducerActiveProduct,
        categories:reducerCategories
    }),
    composeEnhancers(applyMiddleware(thunk))
)
     