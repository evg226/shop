import {CATEGORIES_LOAD_FULL, SET_ACTIVE_PRODUCT, SET_PRODUCTS_PAGE, setProductsPage, USER_SIGNIN} from "./action";

export const reducerUser = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN:
         return action.payload
        default:
            return state
    }
};

export const reducerProducts = (state = {}, action) => {
    switch (action.type) {
        case SET_PRODUCTS_PAGE:
            return action.payload;
        case SET_ACTIVE_PRODUCT:
            return {
                ...state,
                activeProduct:action.payload
            }
        default:
            return state
    }
};

export const reducerActiveProduct = (state = {}, action) => {
    switch (action.type) {
        case SET_ACTIVE_PRODUCT:
            return action.payload
        default:
            return state
    }
};

export const reducerCategories = (state = {}, action) => {
    switch (action.type) {
        case CATEGORIES_LOAD_FULL:
            return action.payload
        default:
            return state
    }
};

