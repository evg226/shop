import {$host, getFormData} from "./index";

export const fetchCart = async () =>{
    const response = await $host.get("api/cart/");
    return response.data;
};

export const updateCart=async(data)=>{
    const responce=await $host.post("api/cart/update.php",getFormData(data));
    return responce.data;
}
export const deleteCart=async(data)=>{
    const responce=await $host.post("api/cart/delete.php",getFormData(data));
    return responce.data;
}

export const createCart=async(data)=>{
    const responce=await $host.post("api/cart/create.php",getFormData(data));
    return responce.data;
}
