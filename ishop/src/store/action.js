import {signin, signout} from "../http/user";
import {fetchProductsPage,fetchProduct} from "../http/productsApi";
import {
    createCategoryQuery,
    createCollectionQuery, deleteCategoryQuery, deleteCCategoryQuery,
    deleteCollectionQuery,
    fetchCategories, updateCategoryQuery,
    updateCollectionQuery
} from "../http/categoriesApi";
import {createCart, deleteCart, fetchCart, updateCart} from "../http/cartApi";
import {cancelOrderById, createOrder, fetchOrder} from "../http/ordersApi";


export const CATEGORIES_LOAD_FULL="CATEGORIES::LOAD_FULL";

export const setFullCategories=(categoriesNav)=>{
    return {
        type:CATEGORIES_LOAD_FULL,
        payload:categoriesNav
    }
}

export const loadFullCategories=()=>async dispatch =>{
    try {
        const categoriesNav = await fetchCategories();
        dispatch(setFullCategories(categoriesNav));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const USER_SIGNIN="USER::USER_SIGNIN";

export const userSignin=(user)=>{
    return {
        type:USER_SIGNIN,
        payload:user
    }
}

export const userSigninQuery=(email,password)=>async dispatch =>{
    try {
        const formData=new FormData();
        formData.append("email",email);
        formData.append("password",password)
        const user = await signin(formData);
        dispatch(userSignin(user));
        dispatch(loadCart());
        dispatch(loadOrder());
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const SET_CART="CART::SET";

export const  setCart=(cart)=>{
    return {
        type:SET_CART,
        payload:cart
    }
}

export const loadCart = () => async dispatch => {
    try {
        const cart = await fetchCart();
        dispatch(setCart(cart));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}


export const addCartDB=(cartItem)=>async dispatch=>{
    try {
        const cart = await createCart(cartItem);
        cart&&dispatch(loadCart());
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}


export const MODIFY_CART="CART:MODIFY";

export const  modifyCart=(cartItem)=>{
    return {
        type:MODIFY_CART,
        payload:cartItem
    }
}

export const modifyCartDB=(cartItem)=>async dispatch=>{
    try {
        const cart = await updateCart(cartItem);
        cart&&dispatch(modifyCart(cartItem));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}


export const REMOVE_CART="CART:REMOVE";

export const  removeCart=(cartItem)=>{
    return {
        type:REMOVE_CART,
        payload:cartItem
    }
}

export const removeCartDB=(cartItem)=>async dispatch=>{
    try {
        const cart = await deleteCart({id:cartItem.id});
        cart&&dispatch(removeCart(cartItem));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const userSignOutQuery=()=>async dispatch =>{
    try {
        await signout();
        dispatch(userSignin(""));
        dispatch(setCart({quantity:0}));
        dispatch(setOrder({}))
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}


export const SET_PRODUCTS_PAGE="PRODUCTS::SET_PAGE";

export const setProductsPage=(productsPage)=>{
    return {
        type:SET_PRODUCTS_PAGE,
        payload:productsPage
    }
}

export const loadProductsPage=(page,limit)=>async dispatch =>{
    try {
        const productsPage = await fetchProductsPage(page,limit);
        dispatch(setProductsPage(productsPage));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const SET_ACTIVE_PRODUCT="PRODUCTS::SET_ACTIVE";

export const setActiveProduct=(activeProduct)=>{
    return {
        type:SET_ACTIVE_PRODUCT,
        payload:activeProduct
    }
}

export const loadProduct=(id)=>async dispatch =>{
    try {
        const product = await fetchProduct(id);
        dispatch(setActiveProduct(product));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const SET_ORDER="ORDER::SET";

export const  setOrder=(order)=>{
    return {
        type:SET_ORDER,
        payload:order
    }
}

export const loadOrder = () => async dispatch => {
    try {
        const order = await fetchOrder();
        dispatch(setOrder(order));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}


export const addOrderDB=(address)=>async dispatch=>{
    try {
        const order = await createOrder(address);
        if (order) {
            dispatch(loadOrder(order));
            dispatch(loadCart());
        }
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const SET_STATUS_ORDER="ORDER::SET_STATUS";

export const  setStatusOrder=(order,orderDate,status)=>{
    return {
        type:SET_STATUS_ORDER,
        payload:{order,orderDate,status}
    }
}

export const setStatusOrderDB = (order,orderDate,status) => async dispatch => {
    try {
        const orderResponce = await cancelOrderById(order.id,status);
        orderResponce && dispatch(setStatusOrder(order,orderDate,status));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const UPDATE_COLLECTION="COLLECTION:UPDATE";

export const  updateCollection=(id,newName)=>{
    return {
        type:UPDATE_COLLECTION,
        payload: {id, newName}
    }
}

export const updateCollectionDB = (id,newName) => async dispatch => {
    try {
        const response = await updateCollectionQuery(id,newName);
        response && dispatch(updateCollection(id,newName));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const DELETE_COLLECTION="COLLECTION:DELETE";

export const  deleteCollection=(id)=>{
    return {
        type:DELETE_COLLECTION,
        payload: id
    }
}

export const deleteCollectionDB = (id) => async dispatch => {
    try {
        const response = await deleteCollectionQuery(id);
        response && dispatch(deleteCollection(id));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const CREATE_COLLECTION="COLLECTION:CREATE";

export const  createCollection=(id,name)=>{
    return {
        type:CREATE_COLLECTION,
        payload: {id, name}
    }
}

export const createCollectionDB = (name) => async dispatch => {
    try {
        const response = await createCollectionQuery(name);
        response && dispatch(createCollection(response,name));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const CREATE_CATEGORY="CATEGORY:CREATE";

export const  createCategory=(id,name,collectionId)=>{
    return {
        type:CREATE_CATEGORY,
        payload: {id, name,collectionId}
    }
}

export const createCategoryDB = (name,collectionId) => async dispatch => {
    try {
        const response = await createCategoryQuery(name,collectionId);
        response && dispatch(createCategory(response,name,collectionId));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const DELETE_CATEGORY="CATEGORY:DELETE";

export const  deleteCategory=(id,collectionId)=>{
    return {
        type:DELETE_CATEGORY,
        payload: {id, collectionId}
    }
}

export const deleteCategoryDB = (id,collectionId) => async dispatch => {
    try {
        const response = await deleteCategoryQuery(id,collectionId);
        response && dispatch(deleteCategory(id,collectionId));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}

export const UPDATE_CATEGORY="COLLECTION:CATEGORY";

export const  updateCategory=(id,newName,collectionId)=>{
    return {
        type:UPDATE_CATEGORY,
        payload: {id, newName,collectionId}
    }
}

export const updateCategoryDB = (id,newName,collectionId) => async dispatch => {
    try {
        const response = await updateCategoryQuery(id,newName,collectionId);
        response && dispatch(updateCategory(id,newName,collectionId));
    } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
    }
}