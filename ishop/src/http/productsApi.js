import {$host, getFormData} from "./index";



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

export const createProductsQuery=async(product)=>{
    const response=await $host.post("api/product/create.php",getFormData(product));
    return response.data;
}

export const updateProductsQuery=async(product)=>{
    const response=await $host.post("api/product/update.php",getFormData(product));
    return response.data;
}

export const deleteProductsQuery=async(id)=>{
    const response=await $host.post("api/product/delete.php",getFormData({id}));
    return response.data;
}