import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
        reducerActiveProduct,
        reducerCart,
        reducerCategories, reducerImages, reducerLoading,
        reducerOrder,
        reducerProducts,
        reducerUser
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combineReducers({
        loading:reducerLoading,
        user: reducerUser,
        productsPage:reducerProducts,
        activeProduct:reducerActiveProduct,
        categories:reducerCategories,
        cart:reducerCart,
        order:reducerOrder,
        images:reducerImages
    }),
    composeEnhancers(applyMiddleware(thunk))
)
     