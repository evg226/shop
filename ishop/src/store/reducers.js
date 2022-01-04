import {
    CANCEL_ORDER,
    CATEGORIES_LOAD_FULL, MODIFY_CART, REMOVE_CART,
    SET_ACTIVE_PRODUCT,
    SET_CART, SET_ORDER,
    SET_PRODUCTS_PAGE,
    setProductsPage,
    USER_SIGNIN
} from "./action";

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

export const reducerCart = (state={quantity:0},action)=>{
    switch (action.type) {
        case SET_CART:
            return action.payload
        case MODIFY_CART:
            if (action.payload.quantity>0){
                const newCart = {...state};
                const item = newCart.rows.find(row => row.id === action.payload.id);
                newCart.quantity = state.quantity + parseInt(action.payload.quantity) - item.quantity;
                newCart.total = state.total + (parseInt(action.payload.quantity) - item.quantity) * item.price;
                item.quantity = action.payload.quantity;
                item.color = action.payload.color;
                item.size = action.payload.size;
                return newCart;
            }
            else {
                return {
                    quantity: state.quantity-action.payload.quantity,
                    total:state.total-action.payload.quantity*action.payload.price,
                    rows:state.rows.filter(row=>row.id !== action.payload.id)
                }
            }
        case REMOVE_CART:{
            return {
                quantity: state.quantity-action.payload.quantity,
                total:state.total-action.payload.quantity*action.payload.price,
                rows:state.rows.filter(row=>row.id !== action.payload.id)
            }
        }
        default:return state
    }
}


export const reducerOrder = (state={},action)=>{
    switch (action.type){
        case SET_ORDER:
            return action.payload
        case CANCEL_ORDER:
            console.log(action.payload.orderDate);
            const newOrder=state[action.payload.orderDate].find(item=>item.id==action.payload.order.id);
            const oldOrders=state[action.payload.orderDate].filter(item=>item.id!=action.payload.order.id);
            newOrder.status="cancelled";
            console.log(newOrder)
            return {
                ...state,
                [action.payload.orderDate]:[
                    ...oldOrders,newOrder
                ]
            }
        default:
            return state
    }
}