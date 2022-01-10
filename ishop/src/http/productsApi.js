import {$host} from "./index";



export const fetchProductsPage = async (page,limit,collectionId,categoryId) =>{
    const response= await $host.get("api/product/", {params:{page,limit,collectionId,categoryId}});
    return response.data;
};

export const fetchProduct = async (id) =>{
    const response= await $host.get("api/product/", {params:{id}});
    return response.data;
};

export const fetchProductsByCategory = async (categoryId) =>{
    const response= await $host.get("api/product/", {params:{categoryId,cat:1}});
    return response.data;
};