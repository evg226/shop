import {$host, getFormData} from "./index";

export const fetchCategories = async () =>{
    const response= await $host.get("api/category/readfull.php" );
    return response.data;
};


export const updateCollectionQuery=async(id,name)=>{
    const response=await $host.post("api/collection/update.php",getFormData({id,name}));
    return response.data;
}

export const deleteCollectionQuery=async(id)=>{
    const response=await $host.post("api/collection/delete.php",getFormData({id}));
    return response.data;
}

export const createCollectionQuery=async(name)=>{
    const response=await $host.post("api/collection/create.php",getFormData({name}));
    return response.data;
}

export const createCategoryQuery=async(name,collectionId)=>{
    const response=await $host.post("api/category/create.php",getFormData({name,collectionId}));
    return response.data;
}

export const deleteCategoryQuery=async(id)=>{
    const response=await $host.post("api/category/delete.php",getFormData({id}));
    return response.data;
}

export const updateCategoryQuery=async(id,name,collectionId)=>{
    const response=await $host.post("api/category/update.php",getFormData({id,name,collectionId}));
    return response.data;
}