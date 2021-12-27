import {$host} from "./index";



export const fetchProductsPage = async (page,limit) =>{
    const response= await $host.get("api/product/", {params:{page,limit}});
    return response.data;
};

export const fetchProduct = async (id) =>{
    const response= await $host.get("api/product/", {params:{id}});
    return response.data;
};