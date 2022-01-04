import {$host, getFormData} from "./index";

export const fetchOrder = async () =>{
    const response = await $host.get("api/order/");
    return response.data;
};
//
// export const updateCart=async(data)=>{
//     const responce=await $host.post("api/cart/update.php",getFormData(data));
//     return responce.data;
// }
// export const deleteCart=async(data)=>{
//     const responce=await $host.post("api/cart/delete.php",getFormData(data));
//     return responce.data;
// }

export const createOrder=async(address)=>{
    const responce=await $host.post("api/order/create.php",getFormData(address));
    return responce.data;
}

export const cancelOrderById=async(id)=>{
    const responce=await $host.post("api/order/cancel.php",getFormData({id}));
    return responce.data;
}


