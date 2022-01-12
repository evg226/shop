import {
    CATEGORIES_LOAD_FULL,
    CREATE_CATEGORY,
    CREATE_COLLECTION, CREATE_IMAGES, CREATE_PRODUCT,
    DELETE_CATEGORY,
    DELETE_COLLECTION, DELETE_IMAGES, DELETE_PRODUCT, LOAD_IMAGES,
    MODIFY_CART,
    REMOVE_CART,
    SET_ACTIVE_PRODUCT,
    SET_CART,
    SET_ORDER, SET_PRODUCTS_BY_CATEGORY,
    SET_PRODUCTS_PAGE,
    SET_STATUS_ORDER,
    setProductsPage, UPDATE_CATEGORY,
    UPDATE_COLLECTION, UPDATE_PRODUCT,
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
        case SET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                adminProducts:action.payload
            }
        case UPDATE_PRODUCT:
            const products=state.products.filter(product=>product.id!=action.payload.id);
            const adminProducts=state.adminProducts.filter(product=>product.id!=action.payload.id);
            return {
                ...state,
                products:[
                    ...products,
                    action.payload
                ],
                adminProducts:[
                    ...adminProducts,
                    action.payload
                ]
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                products:[
                    ...state.products,
                    action.payload
                ],
                adminProducts:[
                    ...state.adminProducts,
                    action.payload
                ]
            }
        case DELETE_PRODUCT:
            const removeProducts=state.products.filter(product=>product.id!=action.payload);
            const removeAdmProducts=state.adminProducts.filter(product=>product.id!=action.payload);
            console.log(removeProducts);
            return {
                ...state,
                products:removeProducts,
                adminProducts:removeAdmProducts
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
            return action.payload;
        case UPDATE_COLLECTION:
            const colletion=state.find(item=>item.id==action.payload.id);
            colletion.name=action.payload.newName;
            const collections=state.filter(item=>item.id!=action.payload.id);
            return [
                ...collections,
                colletion
            ];
        case CREATE_COLLECTION:
            return [
                ...state,
                {
                    id:action.payload.id,
                    name:action.payload.name,
                    categories:[]
                }
            ];
        case DELETE_COLLECTION:
            const collection=state.filter(item=>item.id!=action.payload);
            return collection
        case CREATE_CATEGORY:
            const modeCollection=state.find(item=>item.id==action.payload.collectionId);
            const filteredCollections=state.filter(item=>item.id!=action.payload.collectionId);
            return [
                ...filteredCollections,
                {...modeCollection,categories:[...modeCollection.categories,
                        {id:action.payload.id,name:action.payload.name,collectionId:action.payload.collectionId}
                    ]}
            ];
        case DELETE_CATEGORY:
            const deleteCollection=state.find(item=>item.id==action.payload.collectionId);
            const deleteCat=deleteCollection.categories.filter(item=>item.id!==action.payload.id);
            const filterCollections=state.filter(item=>item.id!=action.payload.collectionId);
            return [
                ...filterCollections,
                {...deleteCollection,categories:deleteCat}
            ];
        case UPDATE_CATEGORY:

            const updateCollection=state.find(item=>item.id==action.payload.collectionId);
            const updateCat=updateCollection.categories.find(item=>item.id==action.payload.id);
            updateCat.name=action.payload.newName;
            const categories=updateCollection.categories.filter(item=>item.id!=action.payload.id);
            const filterUpdCollections=state.filter(item=>item.id!=action.payload.collectionId);
            return [
                ...filterUpdCollections,
                {...updateCollection,categories:[...categories,updateCat]}
            ];
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
        case SET_STATUS_ORDER:
            const newOrder=state[action.payload.orderDate].find(item=>item.id==action.payload.order.id);
            const oldOrders=state[action.payload.orderDate].filter(item=>item.id!=action.payload.order.id);
            newOrder.status=action.payload.status;
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

export const reducerImages = (state=[],action)=>{
    switch (action.type){
        case LOAD_IMAGES:
            return action.payload;
        case CREATE_IMAGES:return [
            ...state,
            action.payload
        ];
        case DELETE_IMAGES:
            return state.filter(image=>image.id!==action.payload);
        default:
            return state
    }
}